import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useDownload } from "@/hooks/use-download";
import { videoInfoSchema } from "@shared/schema";
import { Search, Loader2 } from "lucide-react";

interface DownloadFormProps {
  onVideoInfoReceived: (data: any) => void;
}

export function DownloadForm({ onVideoInfoReceived }: DownloadFormProps) {
  const { toast } = useToast();
  const { getVideoInfo, isLoading } = useDownload();

  const form = useForm({
    resolver: zodResolver(videoInfoSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: { url: string }) => {
    try {
      const result = await getVideoInfo(data.url);
      onVideoInfoReceived({ ...result, url: data.url }); // Pass the URL along with the result
      toast({
        title: "Success!",
        description: "Video information retrieved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to get video information",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="download-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Paste Video URL Below</h2>
        <p className="text-muted-foreground">Enter the URL of the video you want to download</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://..."
                    {...field}
                    className="text-lg py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full btn-gradient text-lg py-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Get Download Options
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
