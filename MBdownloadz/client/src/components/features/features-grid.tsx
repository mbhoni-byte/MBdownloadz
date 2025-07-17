import { Zap, Shield, Smartphone, Globe, Video, CreditCard } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Download videos in seconds with our optimized servers and advanced processing technology.",
  },
  {
    icon: Shield,
    title: "100% Safe",
    description: "No malware, no viruses. Your security is our priority with encrypted connections.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on all devices - desktop, tablet, and mobile phones.",
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    description: "Support for YouTube, TikTok, Instagram, Facebook, and 50+ other platforms.",
  },
  {
    icon: Video,
    title: "HD Quality",
    description: "Download in original quality up to 4K resolution with multiple format options.",
  },
  {
    icon: CreditCard,
    title: "Always Free",
    description: "No hidden fees, no subscriptions. Completely free service forever.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">Why Choose MBdownloadz?</h2>
        <p className="text-lg text-muted-foreground">
          Fast, reliable, and completely free video downloading service
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              <feature.icon className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
