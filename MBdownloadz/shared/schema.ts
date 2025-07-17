import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const downloadRequests = pgTable("download_requests", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  platform: text("platform").notNull(),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  videoInfo: jsonb("video_info"),
  selectedQuality: text("selected_quality"),
  downloadUrl: text("download_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDownloadRequestSchema = createInsertSchema(downloadRequests).pick({
  url: true,
  platform: true,
  selectedQuality: true,
});

export const videoInfoSchema = z.object({
  url: z.string().url(),
});

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.enum(["technical", "feature", "bug", "general"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDownloadRequest = z.infer<typeof insertDownloadRequestSchema>;
export type DownloadRequest = typeof downloadRequests.$inferSelect;
export type VideoInfo = z.infer<typeof videoInfoSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;

export interface VideoMetadata {
  title: string;
  duration: string;
  thumbnail: string;
  platform: string;
  qualities: QualityOption[];
}

export interface QualityOption {
  quality: string;
  format: string;
  size: string;
  type: 'video' | 'audio';
}

export interface DownloadProgress {
  progress: number;
  downloadedSize: string;
  totalSize: string;
  speed: string;
  status: 'downloading' | 'complete' | 'error';
}
