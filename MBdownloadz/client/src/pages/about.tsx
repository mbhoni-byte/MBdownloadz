import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function About() {
  const features = [
    "Support for 50+ video platforms",
    "Multiple quality options (480p to 4K)",
    "Audio extraction capabilities",
    "No watermarks on downloads",
    "Mobile-responsive design",
    "No registration required",
  ];

  return (
    <div className="page-content">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">About MBdownloadz</h1>
            <p className="text-xl text-muted-foreground">
              Your trusted partner for video downloading needs
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    MBdownloadz was created with a simple mission: to provide users with a fast, reliable, and completely free way to download videos from their favorite platforms. We believe that accessing your favorite content should be easy and hassle-free.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">What We Offer</h2>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Our Technology</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cutting-edge technology including yt-dlp for optimal video processing and advanced web scraping techniques to ensure compatibility with the latest platform updates. Our servers are optimized for speed and reliability.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Privacy & Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your privacy is important to us. We don't store your downloaded videos or personal information. All downloads are processed securely and deleted from our servers immediately after completion.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
