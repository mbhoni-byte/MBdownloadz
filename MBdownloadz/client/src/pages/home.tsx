import { useState } from "react";
import { DownloadForm } from "@/components/download/download-form";
import { QualitySelector } from "@/components/download/quality-selector";
import { ProgressTracker } from "@/components/download/progress-tracker";
import { FeaturesGrid } from "@/components/features/features-grid";
import { AdPlaceholder } from "@/components/ui/ad-placeholder";
import { VideoMetadata } from "@shared/schema";
import { SiYoutube, SiTiktok, SiInstagram, SiFacebook } from "react-icons/si";

export default function Home() {
  const [videoInfo, setVideoInfo] = useState<VideoMetadata | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleVideoInfoReceived = (data: { videoInfo: VideoMetadata; id: number; url?: string }) => {
    setVideoInfo(data.videoInfo);
    setVideoUrl(data.url || ""); // Store the actual URL for download
  };

  const handleDownloadStart = () => {
    setDownloadStarted(true);
  };

  const handleDownloadComplete = () => {
    setDownloadComplete(true);
    // Reset after 5 seconds
    setTimeout(() => {
      setVideoInfo(null);
      setVideoUrl("");
      setDownloadStarted(false);
      setDownloadComplete(false);
    }, 5000);
  };

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Download Videos from Any Platform
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Fast, free, and easy video downloader supporting YouTube, TikTok, Instagram, Facebook, and more!
            </p>
            
            {/* Platform Icons */}
            <div className="flex justify-center items-center space-x-6 mb-8">
              <div className="platform-icon">
                <SiYoutube className="h-8 w-8 text-red-500" />
              </div>
              <div className="platform-icon">
                <SiTiktok className="h-8 w-8 text-black" />
              </div>
              <div className="platform-icon">
                <SiInstagram className="h-8 w-8 text-pink-500" />
              </div>
              <div className="platform-icon">
                <SiFacebook className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Download Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-4xl mx-auto">
          {!videoInfo && !downloadStarted && (
            <DownloadForm onVideoInfoReceived={handleVideoInfoReceived} />
          )}

          {videoInfo && !downloadStarted && (
            <div className="download-card">
              <QualitySelector
                videoInfo={videoInfo}
                videoUrl={videoUrl}
                onDownloadStart={handleDownloadStart}
              />
            </div>
          )}

          {downloadStarted && !downloadComplete && (
            <ProgressTracker onComplete={handleDownloadComplete} />
          )}

          {downloadComplete && (
            <div className="download-card text-center">
              <div className="text-green-600 text-xl font-bold mb-4">
                Download Complete!
              </div>
              <p className="text-muted-foreground">
                Your video should start downloading automatically. If not, please check your downloads folder.
              </p>
            </div>
          )}

          <AdPlaceholder size="leaderboard" />
        </div>
      </div>

      {/* Features Section */}
      <FeaturesGrid />

      <div className="container mx-auto px-4">
        <AdPlaceholder size="rectangle" className="max-w-md mx-auto" />
      </div>
    </div>
  );
}
