import { spawn } from 'child_process';
import { VideoMetadata, QualityOption } from '@shared/schema';

export class YoutubeDownloader {
  async getVideoInfo(url: string): Promise<VideoMetadata> {
    try {
      const args = [
        '--dump-json',
        '--no-warnings',
        '--no-playlist',
        '--skip-download',
        '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        url
      ];

      const output = await this.executeYtDlp(args);
      const videoData = JSON.parse(output);

      // Extract available formats and create quality options
      const qualities: QualityOption[] = [];
      
      // Add video qualities
      if (videoData.formats) {
        const videoFormats = videoData.formats.filter((f: any) => f.vcodec && f.vcodec !== 'none');
        const uniqueHeights = Array.from(new Set(videoFormats.map((f: any) => f.height).filter(Boolean))) as number[];
        uniqueHeights.sort((a, b) => b - a);
        
        uniqueHeights.forEach(height => {
          const format = videoFormats.find((f: any) => f.height === height);
          if (format) {
            qualities.push({
              quality: `${height}p`,
              format: 'MP4',
              size: format.filesize ? this.formatFileSize(format.filesize) : 'Unknown',
              type: 'video'
            });
          }
        });
      }

      // Add audio quality
      qualities.push({
        quality: 'audio',
        format: 'MP3',
        size: 'Unknown',
        type: 'audio'
      });

      return {
        title: videoData.title || 'Unknown Title',
        duration: this.formatDuration(videoData.duration || 0),
        thumbnail: videoData.thumbnail || videoData.thumbnails?.[0]?.url || '',
        platform: 'youtube',
        qualities: qualities.length > 0 ? qualities : [
          { quality: '720p', format: 'MP4', size: 'Unknown', type: 'video' },
          { quality: '480p', format: 'MP4', size: 'Unknown', type: 'video' },
          { quality: 'audio', format: 'MP3', size: 'Unknown', type: 'audio' }
        ],
      };
    } catch (error) {
      // If yt-dlp fails due to bot detection, provide basic fallback info
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('bot') || errorMessage.includes('Sign in') || errorMessage.includes('protect our community')) {
        const videoId = url.match(/(?:watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
        const qualities: QualityOption[] = [
          { quality: '720p', format: 'MP4', size: 'Unknown', type: 'video' },
          { quality: '480p', format: 'MP4', size: 'Unknown', type: 'video' },
          { quality: 'audio', format: 'MP3', size: 'Unknown', type: 'audio' }
        ];
        
        return {
          title: `YouTube Video (${videoId || 'Unknown'})`,
          duration: 'Unknown',
          thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '',
          platform: 'youtube',
          qualities,
        };
      }
      throw new Error(`Failed to get YouTube video info: ${errorMessage}`);
    }
  }

  async download(url: string, quality: string): Promise<string> {
    try {
      const timestamp = Date.now();
      let outputPath: string;
      let args: string[];

      if (quality === 'audio') {
        outputPath = `/tmp/youtube_audio_${timestamp}.%(ext)s`;
        args = [
          '--extract-audio',
          '--audio-format', 'mp3',
          '--audio-quality', '0',
          '--output', outputPath,
          '--no-warnings',
          '--no-playlist',
          '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          url
        ];
      } else {
        outputPath = `/tmp/youtube_video_${timestamp}.%(ext)s`;
        const formatSelector = this.getFormatSelector(quality);
        args = [
          '--format', formatSelector,
          '--output', outputPath,
          '--no-warnings',
          '--no-playlist',
          '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          url
        ];
      }

      await this.executeYtDlp(args);
      
      // Return the actual file path (yt-dlp replaces %(ext)s with actual extension)
      const extension = quality === 'audio' ? 'mp3' : 'mp4';
      return `/tmp/youtube_${quality === 'audio' ? 'audio' : 'video'}_${timestamp}.${extension}`;
    } catch (error) {
      throw new Error(`Failed to download YouTube video: ${(error as Error).message}`);
    }
  }

  async executeYtDlp(args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const process = spawn('yt-dlp', args);
      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(new Error(`yt-dlp failed with code ${code}: ${stderr}`));
        }
      });
    });
  }

  private getFormatSelector(quality: string): string {
    switch (quality) {
      case '1080p':
        return 'best[height<=1080]';
      case '720p':
        return 'best[height<=720]';
      case '480p':
        return 'best[height<=480]';
      default:
        return 'best';
    }
  }

  private formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
