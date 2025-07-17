import { spawn } from 'child_process';
import { VideoMetadata, QualityOption } from '@shared/schema';
import { YoutubeDownloader } from './platforms/youtube';
import { TiktokDownloader } from './platforms/tiktok';
import { InstagramDownloader } from './platforms/instagram';
import { FacebookDownloader } from './platforms/facebook';

export class VideoDownloader {
  private youtubeDownloader: YoutubeDownloader;
  private tiktokDownloader: TiktokDownloader;
  private instagramDownloader: InstagramDownloader;
  private facebookDownloader: FacebookDownloader;

  constructor() {
    this.youtubeDownloader = new YoutubeDownloader();
    this.tiktokDownloader = new TiktokDownloader();
    this.instagramDownloader = new InstagramDownloader();
    this.facebookDownloader = new FacebookDownloader();
  }

  detectPlatform(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    }
    if (url.includes('tiktok.com')) {
      return 'tiktok';
    }
    if (url.includes('instagram.com')) {
      return 'instagram';
    }
    if (url.includes('facebook.com') || url.includes('fb.com')) {
      return 'facebook';
    }
    throw new Error('Unsupported platform');
  }

  async getVideoInfo(url: string): Promise<VideoMetadata> {
    const platform = this.detectPlatform(url);
    
    switch (platform) {
      case 'youtube':
        return this.youtubeDownloader.getVideoInfo(url);
      case 'tiktok':
        return this.tiktokDownloader.getVideoInfo(url);
      case 'instagram':
        return this.instagramDownloader.getVideoInfo(url);
      case 'facebook':
        return this.facebookDownloader.getVideoInfo(url);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  async downloadVideo(url: string, quality: string): Promise<string> {
    const platform = this.detectPlatform(url);
    
    switch (platform) {
      case 'youtube':
        return this.youtubeDownloader.download(url, quality);
      case 'tiktok':
        return this.tiktokDownloader.download(url, quality);
      case 'instagram':
        return this.instagramDownloader.download(url, quality);
      case 'facebook':
        return this.facebookDownloader.download(url, quality);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
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
}
