import { Accessibility } from "lucide-react";

interface AdPlaceholderProps {
  size?: "banner" | "rectangle" | "leaderboard";
  className?: string;
}

export function AdPlaceholder({ size = "banner", className = "" }: AdPlaceholderProps) {
  const sizeConfig = {
    banner: { width: "728x90", label: "Banner Accessibility" },
    rectangle: { width: "300x250", label: "Rectangle Accessibility" },
    leaderboard: { width: "970x90", label: "Leaderboard Accessibility" },
  };

  const config = sizeConfig[size];

  return (
    <div className={`ad-placeholder ${className}`}>
      <Accessibility className="h-6 w-6 mx-auto mb-2" />
      <div className="text-sm">Advertisement Space</div>
      <div className="text-xs opacity-75">{config.width} {config.label}</div>
    </div>
  );
}
