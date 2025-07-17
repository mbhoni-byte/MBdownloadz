export function detectPlatform(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('tiktok.com')) {
    return 'tiktok';
  }
  if (url.includes('instagram.com')) {
    return 'instagram';
  }
  if (url.includes('facebook.com') || url.includes('fb.com')) {
    return 'facebook';
  }
  return 'unknown';
}

export function getPlatformIcon(platform: string): string {
  switch (platform) {
    case 'youtube':
      return 'fab fa-youtube';
    case 'tiktok':
      return 'fab fa-tiktok';
    case 'instagram':
      return 'fab fa-instagram';
    case 'facebook':
      return 'fab fa-facebook';
    default:
      return 'fas fa-video';
  }
}

export function getPlatformColor(platform: string): string {
  switch (platform) {
    case 'youtube':
      return 'text-red-500';
    case 'tiktok':
      return 'text-black';
    case 'instagram':
      return 'text-pink-500';
    case 'facebook':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
}

export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
