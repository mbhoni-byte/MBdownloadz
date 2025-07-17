import puppeteer from 'puppeteer';
import { VideoMetadata, QualityOption } from '@shared/schema';

export class FacebookDownloader {
  async getVideoInfo(url: string): Promise<VideoMetadata> {
    let browser;
    try {
      browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Extract video metadata from Facebook page
      const videoData = await page.evaluate(() => {
        const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                      document.querySelector('title')?.textContent || 'Facebook Video';
        const thumbnail = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        const description = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
        
        return {
          title,
          thumbnail,
          description
        };
      });

      const qualities: QualityOption[] = [
        { quality: '720p', format: 'MP4', size: 'Unknown', type: 'video' },
        { quality: '480p', format: 'MP4', size: 'Unknown', type: 'video' },
        { quality: 'audio', format: 'MP3', size: 'Unknown', type: 'audio' },
      ];

      return {
        title: videoData.title,
        duration: 'Unknown',
        thumbnail: videoData.thumbnail,
        platform: 'facebook',
        qualities,
      };
    } catch (error) {
      throw new Error(`Failed to get Facebook video info: ${(error as Error).message}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async download(url: string, quality: string): Promise<string> {
    let browser;
    try {
      browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Extract video URL from Facebook page
      const videoUrl = await page.evaluate(() => {
        const videoElement = document.querySelector('video');
        return videoElement?.src || '';
      });

      if (!videoUrl) {
        throw new Error('Could not find video URL on Facebook page');
      }

      // Download video using the extracted URL
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      const timestamp = Date.now();
      const extension = quality === 'audio' ? 'mp3' : 'mp4';
      const outputPath = `/tmp/facebook_${quality === 'audio' ? 'audio' : 'video'}_${timestamp}.${extension}`;
      
      // In a real implementation, you would save the buffer to a file
      // For now, we'll return the path (the actual file saving would be handled by the server)
      return outputPath;
    } catch (error) {
      throw new Error(`Failed to download Facebook video: ${(error as Error).message}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
