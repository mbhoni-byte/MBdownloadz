import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadProgress } from "@shared/schema";

interface ProgressTrackerProps {
  onComplete: () => void;
}

export function ProgressTracker({ onComplete }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<DownloadProgress>({
    progress: 0,
    downloadedSize: "0 MB",
    totalSize: "0 MB",
    speed: "0 MB/s",
    status: "downloading",
  });

  useEffect(() => {
    // Simulate download progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev.progress + Math.random() * 15, 100);
        const downloadedSize = `${Math.round(newProgress * 0.5)} MB`;
        const speed = `${(Math.random() * 5 + 2).toFixed(1)} MB/s`;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return {
            ...prev,
            progress: 100,
            downloadedSize,
            speed,
            status: "complete" as const,
          };
        }
        
        return {
          ...prev,
          progress: newProgress,
          downloadedSize,
          speed,
        };
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Card>
      <CardContent className="p-6">
        <h5 className="text-lg font-bold text-primary mb-4">
          {progress.status === "complete" ? "Download Complete!" : "Downloading..."}
        </h5>
        
        <Progress value={progress.progress} className="mb-4" />
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Downloaded: {progress.downloadedSize}</span>
          <span>Speed: {progress.speed}</span>
        </div>
        
        {progress.status === "complete" && (
          <div className="mt-4 text-sm text-green-600 font-medium">
            Your download should start automatically. If not, please check your downloads folder.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
