# MBdownloadz - Comprehensive Video Downloader Development Prompt

## Project Overview
Build a professional, full-stack video downloading web application that supports multiple platforms including YouTube, TikTok, Instagram, and Facebook. The application should be fast, reliable, and completely free for users.

## Architecture Requirements

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Shadcn/ui built on Radix UI primitives
- **Styling**: Tailwind CSS with custom gradient design system
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React for UI icons, React Icons for platform logos

### Backend Stack
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (fallback to in-memory storage)
- **Video Processing**: yt-dlp integration for YouTube, TikTok
- **Web Scraping**: Puppeteer for Instagram, Facebook (platforms requiring browser automation)
- **Session Management**: Express sessions with PostgreSQL storage

### Core Features to Implement

#### 1. Video Download System
```typescript
// Platform support with specific downloaders
- YouTube: Full yt-dlp integration with format selection (480p, 720p, 1080p, 4K, audio-only)
- TikTok: yt-dlp with watermark removal capabilities
- Instagram: Puppeteer-based scraping for video extraction
- Facebook: Browser automation for video URL extraction
- Quality options: Multiple resolutions and audio-only downloads
- Progress tracking: Real-time download status and progress monitoring
```

#### 2. User Interface Components
- **Download Form**: URL input with platform auto-detection and validation
- **Quality Selector**: Interactive interface for choosing video quality and format
- **Progress Tracker**: Visual progress bars with download speed and status
- **Video Preview**: Thumbnail display with title, duration, and platform info
- **Platform Icons**: Visual indicators for supported platforms

#### 3. Professional Pages
- **Homepage**: Hero section with download interface and feature highlights
- **About Page**: Company mission, technology stack, and feature list
- **Contact Page**: Contact form with validation (technical, feature, bug, general inquiries)
- **Terms of Service**: Legal terms and user responsibilities
- **Privacy Policy**: Data collection, usage, and user rights information

### Technical Implementation Details

#### Database Schema
```sql
-- Users table for basic user management
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Download requests tracking
CREATE TABLE download_requests (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  platform TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  video_info JSONB,
  selected_quality TEXT,
  download_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### API Endpoints
```typescript
// Video information retrieval
POST /api/video/info
{
  "url": "https://youtube.com/watch?v=..."
}

// Video download initiation
POST /api/video/download
{
  "url": "https://youtube.com/watch?v=...",
  "quality": "720p"
}

// Download status checking
GET /api/video/status/:id

// Contact form submission
POST /api/contact
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "subject": "technical",
  "message": "..."
}
```

#### Platform-Specific Implementations

**YouTube Downloader (yt-dlp)**
```typescript
export class YoutubeDownloader {
  async getVideoInfo(url: string): Promise<VideoMetadata> {
    // Use yt-dlp --dump-json to extract metadata
    // Return title, duration, thumbnail, available qualities
  }
  
  async download(url: string, quality: string): Promise<string> {
    // Use yt-dlp with format selectors
    // Support: best[height<=1080], best[height<=720], audio extraction
  }
}
```

**TikTok Downloader (yt-dlp)**
```typescript
export class TiktokDownloader {
  async getVideoInfo(url: string): Promise<VideoMetadata> {
    // Extract TikTok video metadata without watermarks
  }
  
  async download(url: string, quality: string): Promise<string> {
    // Download TikTok videos without watermarks
  }
}
```

**Instagram Downloader (Puppeteer)**
```typescript
export class InstagramDownloader {
  async getVideoInfo(url: string): Promise<VideoMetadata> {
    // Use Puppeteer to scrape Instagram page
    // Extract video metadata from DOM
  }
  
  async download(url: string, quality: string): Promise<string> {
    // Extract direct video URL and download
  }
}
```

**Facebook Downloader (Puppeteer)**
```typescript
export class FacebookDownloader {
  async getVideoInfo(url: string): Promise<VideoMetadata> {
    // Browser automation for Facebook video extraction
  }
  
  async download(url: string, quality: string): Promise<string> {
    // Extract and download Facebook videos
  }
}
```

### UI/UX Design Requirements

#### Design System
- **Color Palette**: Blue-purple gradient theme (primary: #3b82f6, secondary: #8b5cf6)
- **Typography**: Sans-serif font stack with clear hierarchy
- **Components**: Rounded corners, subtle shadows, smooth animations
- **Responsive**: Mobile-first design with breakpoints for tablet and desktop

#### Component Specifications
```css
/* Gradient buttons with hover effects */
.btn-gradient {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 9999px;
  transition: all 0.3s ease;
}

/* Platform icons with hover animations */
.platform-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

/* Download cards with subtle borders */
.download-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}
```

### Ad Integration Strategy
- **Placement**: Strategic ad placeholders in non-intrusive locations
- **Types**: Banner (728x90), Rectangle (300x250), Leaderboard (970x90)
- **Implementation**: React components ready for Google AdSense integration
- **Revenue**: Monetization through display advertising

### Performance Optimization
- **Frontend**: Vite build optimization, lazy loading, code splitting
- **Backend**: Efficient video processing, temporary file cleanup
- **Caching**: TanStack Query for client-side caching
- **Storage**: Temporary file storage with automatic cleanup

### Security Considerations
- **Input Validation**: Zod schemas for all user inputs
- **CORS**: Proper cross-origin resource sharing configuration
- **Rate Limiting**: Prevent abuse of download endpoints
- **Data Privacy**: No permanent storage of user videos or personal data

### Development Guidelines
1. **Code Quality**: TypeScript strict mode, ESLint, Prettier
2. **Testing**: Unit tests for critical functions, integration tests for API endpoints
3. **Error Handling**: Comprehensive error catching and user-friendly messages
4. **Logging**: Structured logging for debugging and monitoring
5. **Documentation**: Clear code comments and API documentation

### Deployment Requirements
- **Environment**: Node.js hosting with PostgreSQL support
- **Dependencies**: yt-dlp system installation required
- **Configuration**: Environment variables for database and external services
- **Scaling**: Designed for horizontal scaling with load balancers

### File Structure
```
project/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Route components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and API client
├── server/               # Express backend
│   ├── services/         # Business logic
│   │   └── platforms/    # Platform-specific downloaders
│   ├── routes.ts         # API endpoints
│   └── storage.ts        # Database interface
├── shared/               # Shared types and schemas
│   └── schema.ts         # Zod schemas and TypeScript types
└── package.json          # Dependencies and scripts
```

### Success Metrics
- **Performance**: Video info retrieval under 3 seconds
- **Reliability**: 99% success rate for supported platforms
- **User Experience**: Intuitive interface with minimal steps
- **Scalability**: Handle concurrent downloads efficiently
- **Monetization**: Ready for ad network integration

This comprehensive prompt provides a complete blueprint for building MBdownloadz, covering all technical, design, and business requirements for a professional video downloading service.