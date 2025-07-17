import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { VideoDownloader } from "./services/video-downloader";
import { videoInfoSchema, contactFormSchema } from "@shared/schema";
import path from 'path';
import fs from 'fs';

export async function registerRoutes(app: Express): Promise<Server> {
  const videoDownloader = new VideoDownloader();

  // Get video information
  app.post("/api/video/info", async (req, res) => {
    try {
      const { url } = videoInfoSchema.parse(req.body);
      
      const platform = videoDownloader.detectPlatform(url);
      const videoInfo = await videoDownloader.getVideoInfo(url);
      
      // Store the request
      const downloadRequest = await storage.createDownloadRequest({
        url,
        platform,
        selectedQuality: undefined,
      });

      // Update with video info
      await storage.updateDownloadRequest(downloadRequest.id, {
        videoInfo: videoInfo,
        status: "ready",
      });

      res.json({
        success: true,
        data: {
          id: downloadRequest.id,
          videoInfo,
          platform,
        },
      });
    } catch (error) {
      console.error("Error getting video info:", error);
      res.status(400).json({
        success: false,
        error: (error as Error).message || "Failed to get video information",
      });
    }
  });

  // Download video
  app.post("/api/video/download", async (req, res) => {
    try {
      const { url, quality } = z.object({
        url: z.string().url(),
        quality: z.string(),
      }).parse(req.body);

      const downloadRequest = await storage.getDownloadRequestByUrl(url);
      if (!downloadRequest) {
        return res.status(404).json({
          success: false,
          error: "Download request not found",
        });
      }

      // Update status to processing
      await storage.updateDownloadRequest(downloadRequest.id, {
        status: "processing",
        selectedQuality: quality,
      });

      // Start download process
      const filePath = await videoDownloader.downloadVideo(url, quality);
      
      // Extract filename from path
      const filename = path.basename(filePath);
      const downloadUrl = `/api/download/${filename}`;

      // Update with download URL
      await storage.updateDownloadRequest(downloadRequest.id, {
        status: "completed",
        downloadUrl,
      });

      res.json({
        success: true,
        data: {
          downloadUrl,
          status: "completed",
        },
      });
    } catch (error) {
      console.error("Error downloading video:", error);
      res.status(500).json({
        success: false,
        error: (error as Error).message || "Failed to download video",
      });
    }
  });

  // Get download status
  app.get("/api/video/status/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const downloadRequest = await storage.getDownloadRequest(id);
      
      if (!downloadRequest) {
        return res.status(404).json({
          success: false,
          error: "Download request not found",
        });
      }

      res.json({
        success: true,
        data: {
          id: downloadRequest.id,
          status: downloadRequest.status,
          videoInfo: downloadRequest.videoInfo,
          downloadUrl: downloadRequest.downloadUrl,
        },
      });
    } catch (error) {
      console.error("Error getting download status:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get download status",
      });
    }
  });

  // Serve downloaded files
  app.get("/api/download/:filename", async (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join('/tmp', filename);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          error: "File not found",
        });
      }

      // Set appropriate headers
      const extension = path.extname(filename).toLowerCase();
      const contentType = extension === '.mp3' ? 'audio/mpeg' : 'video/mp4';
      
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
      // Clean up file after download (optional)
      fileStream.on('end', () => {
        setTimeout(() => {
          fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        }, 5000); // Delete after 5 seconds
      });
      
    } catch (error) {
      console.error("Error serving file:", error);
      res.status(500).json({
        success: false,
        error: "Failed to serve file",
      });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactFormSchema.parse(req.body);
      
      // In a real implementation, you would send an email or store in database
      console.log("Contact form submission:", contactData);
      
      res.json({
        success: true,
        message: "Thank you for your message! We will get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(400).json({
        success: false,
        error: "Failed to submit contact form",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
