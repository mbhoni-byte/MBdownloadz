import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoMetadata } from "@shared/schema";
import { Download, Clock, Image } from "lucide-react";
import { useDownload } from "@/hooks/use-download";
import { useToast } from "@/hooks/use-toast";

interface QualitySelectorProps {
  videoInfo: VideoMetadata;
  videoUrl: string;
  onDownloadStart: () => void;
}

export function QualitySelector({ videoInfo, videoUrl, onDownloadStart }: QualitySelectorProps) {
  const [selectedQuality, setSelectedQuality] = useState<string>("");
  const { downloadVideo, isLoading } = useDownload();
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!selectedQuality) {
      toast({
        title: "Error",
        description: "Please select a quality option",
        variant: "destructive",
      });
      return;
    }

    try {
      onDownloadStart();
      await downloadVideo(videoUrl, selectedQuality);
      toast({
        title: "Success!",
        description: "Download started successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to download video",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-primary">Choose Quality & Format</h4>
      
      {/* Video Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {videoInfo.thumbnail ? (
                <img
                  src={videoInfo.thumbnail}
                  alt="Video thumbnail"
                  className="w-20 h-12 object-cover rounded-lg"
                />
              ) : (
                <div className="w-20 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Image className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h6 className="font-semibold mb-1">{videoInfo.title}</h6>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>Duration: {videoInfo.duration}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Options */}
      <div className="space-y-2">
        {videoInfo.qualities.map((quality) => (
          <div
            key={quality.quality}
            className={`quality-option ${
              selectedQuality === quality.quality ? "selected" : ""
            }`}
            onClick={() => setSelectedQuality(quality.quality)}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{quality.quality}</div>
                <div className="text-sm text-muted-foreground">
                  {quality.format} • {quality.type === 'audio' ? 'Audio Only' : 'Video'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">{quality.size}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleDownload}
        disabled={!selectedQuality || isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
      >
        <Download className="mr-2 h-5 w-5" />
        Download Video
      </Button>
    </div>
  );
}
