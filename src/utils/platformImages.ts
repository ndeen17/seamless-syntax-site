
const platformImages: { [key: string]: string } = {
  facebook: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png",
  instagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png",
  twitter: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/X_logo_2023_original.svg/2048px-X_logo_2023_original.svg.png",
  reddit: "https://www.redditinc.com/assets/images/site/reddit-logo.png",
  youtube: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",
  tiktok: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2560px-TikTok_logo.svg.png",
  linkedin: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png",
  gmail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png",
  snapchat: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1200px-Snapchat_logo.svg.png",
  telegram: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png",
  default: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
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
