import { spawn } from 'child_process';
import { VideoMetadata, QualityOption } from '@shared/schema';

export class TiktokDownloader {
  async getVideoInfo(url: string): Promise<VideoMetadata> {
    try {
      const args = [
        '--dump-json',
        '--no-warnings',
        '--no-playlist',
        '--skip-download',
        url
      ];

      const output = await this.executeYtDlp(args);
      const videoData = JSON.parse(output);

      const qualities: QualityOption[] = [
        { quality: '720p', format: 'MP4', size: 'Unknown', type: 'video' },
        { quality: '480p', format: 'MP4', size: 'Unknown', type: 'video' },
        { quality: 'audio', format: 'MP3', size: 'Unknown', type: 'audio' },
      ];

      return {
        title: videoData.title || videoData.description || 'TikTok Video',
        duration: this.formatDuration(videoData.duration || 0),
        thumbnail: videoData.thumbnail || videoData.thumbnails?.[0]?.url || '',
        platform: 'tiktok',
        qualities,
      };
    } catch (error) {
      throw new Error(`Failed to get TikTok video info: ${(error as Error).message}`);
    }
  }

  async download(url: string, quality: string): Promise<string> {
    try {
      const timestamp = Date.now();
      let outputPath: string;
      let args: string[];

      if (quality === 'audio') {
        outputPath = `/tmp/tiktok_audio_${timestamp}.%(ext)s`;
        args = [
          '--extract-audio',
          '--audio-format', 'mp3',
          '--output', outputPath,
          '--no-warnings',
          '--no-playlist',
          url
        ];
      } else {
        outputPath = `/tmp/tiktok_video_${timestamp}.%(ext)s`;
        const formatSelector = this.getFormatSelector(quality);
        args = [
          '--format', formatSelector,
          '--output', outputPath,
          '--no-warnings',
          '--no-playlist',
          url
        ];
      }

      await this.executeYtDlp(args);
      
      // Return the actual file path
      const extension = quality === 'audio' ? 'mp3' : 'mp4';
      return `/tmp/tiktok_${quality === 'audio' ? 'audio' : 'video'}_${timestamp}.${extension}`;
    } catch (error) {
      throw new Error(`Failed to download TikTok video: ${(error as Error).message}`);
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
}
