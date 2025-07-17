# MBdownloadz - Video Downloader Application

## Overview

MBdownloadz is a full-stack web application that allows users to download videos from multiple platforms including YouTube, TikTok, Instagram, and Facebook. The application provides a modern, responsive interface built with React and TypeScript, backed by an Express.js server with PostgreSQL database integration using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL sessions using connect-pg-simple
- **Video Processing**: yt-dlp integration for multi-platform video downloading
- **Web Scraping**: Puppeteer for platforms requiring browser automation

### Database Schema
- **Users Table**: Basic user management with username/password
- **Download Requests Table**: Tracks video download requests with metadata, status, and processing information
- **JSON Fields**: Flexible storage for video metadata and quality options

## Key Components

### Video Download System
- **Platform Detection**: Automatic identification of video platform from URL
- **Multi-Platform Support**: Dedicated handlers for YouTube, TikTok, Instagram, and Facebook
- **Quality Selection**: Multiple video quality and format options (up to 4K)
- **Audio Extraction**: MP3 audio-only download capabilities
- **Progress Tracking**: Real-time download progress monitoring

### User Interface Components
- **Download Form**: URL input with validation and platform detection
- **Quality Selector**: Interactive quality and format selection interface
- **Progress Tracker**: Visual progress indicators for download status
- **Features Grid**: Marketing-focused feature highlights
- **Responsive Navigation**: Mobile-friendly navigation with sheet overlay

### Platform Handlers
- **YouTube Downloader**: Full yt-dlp integration with format selection
- **TikTok Downloader**: Specialized TikTok video processing
- **Instagram Downloader**: Puppeteer-based Instagram video extraction
- **Facebook Downloader**: Browser automation for Facebook video downloads

## Data Flow

1. **URL Submission**: User submits video URL through the download form
2. **Platform Detection**: System identifies the video platform automatically
3. **Video Info Retrieval**: Platform-specific handler extracts video metadata
4. **Quality Selection**: User chooses preferred quality and format
5. **Download Processing**: Video is processed and prepared for download
6. **Progress Monitoring**: Real-time status updates during processing
7. **File Delivery**: Completed video file is delivered to user

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL database driver
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Comprehensive UI component primitives
- **puppeteer**: Browser automation for web scraping

### Development Tools
- **yt-dlp**: External video downloading tool (system dependency)
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **tailwindcss**: Utility-first CSS framework

### Infrastructure Requirements
- **PostgreSQL Database**: Primary data storage
- **Node.js Runtime**: Server execution environment
- **yt-dlp Installation**: Required for video processing

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **Database**: Local PostgreSQL or Neon database
- **Process Management**: tsx for TypeScript execution
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Vite production build to `dist/public`
- **Backend**: esbuild bundle to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database Migrations**: Drizzle Kit for schema management

### Environment Configuration
- **NODE_ENV**: Environment detection (development/production)
- **DATABASE_URL**: PostgreSQL connection string
- **Port Configuration**: Flexible port assignment for hosting platforms

### Build Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server startup
- `npm run db:push`: Database schema synchronization

The application is designed for easy deployment on platforms like Replit, Heroku, or similar Node.js hosting services with PostgreSQL database support.