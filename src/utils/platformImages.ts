
const platformImages: { [key: string]: string } = {
  facebook: "/lovable-uploads/facebook.jpg",
  instagram: "/lovable-uploads/instagram.jpg",
  twitter: "/lovable-uploads/twitter.jpg",
  reddit: "/lovable-uploads/reddit.jpg",
  youtube: "/lovable-uploads/youtube.jpg",
  tiktok: "/lovable-uploads/tiktok.jpg",
  linkedin: "/lovable-uploads/linkedin.jpg",
  default: "/lovable-uploads/default-platform.jpg"
};

export const getPlatformImage = (platformName: string): string => {
  const normalizedPlatform = platformName.toLowerCase().trim();
  for (const [platform, image] of Object.entries(platformImages)) {
    if (normalizedPlatform.includes(platform)) {
      return image;
    }
  }
  return platformImages.default;
};
