import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { VideoMetadata } from "@shared/schema";

export function useDownload() {
  const [currentDownloadId, setCurrentDownloadId] = useState<number | null>(null);

  const getVideoInfoMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/video/info", { url });
      return response.json();
    },
  });

  const downloadVideoMutation = useMutation({
    mutationFn: async ({ url, quality }: { url: string; quality: string }) => {
      const response = await apiRequest("POST", "/api/video/download", { url, quality });
      return response.json();
    },
  });

  const downloadStatusQuery = useQuery({
    queryKey: ["/api/video/status", currentDownloadId],
    enabled: !!currentDownloadId,
    refetchInterval: 1000,
  });

  const getVideoInfo = async (url: string) => {
    const result = await getVideoInfoMutation.mutateAsync(url);
    if (!result.success) {
      throw new Error(result.error);
    }
    setCurrentDownloadId(result.data.id);
    return result.data;
  };

  const downloadVideo = async (url: string, quality: string) => {
    const result = await downloadVideoMutation.mutateAsync({ url, quality });
    if (!result.success) {
      throw new Error(result.error);
    }
    
    // Create a temporary anchor element to trigger download
    if (result.data.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.data.downloadUrl;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    return result.data;
  };

  return {
    getVideoInfo,
    downloadVideo,
    downloadStatus: downloadStatusQuery.data,
    isLoading: getVideoInfoMutation.isPending || downloadVideoMutation.isPending,
    error: getVideoInfoMutation.error || downloadVideoMutation.error,
  };
}
