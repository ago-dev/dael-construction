// Image configuration for Sanity images
export const IMAGE_CONFIG = {
  // Default settings for different image types
  featured: {
    format: 'png' as const,
    quality: 100,
    sizes: {
      mobile: { width: 400, height: 300 },
      tablet: { width: 528, height: 384 },
      desktop: { width: 800, height: 600 },
      large: { width: 1200, height: 800 }
    }
  },
  gallery: {
    format: 'png' as const,
    quality: 100,
    sizes: {
      thumbnail: { width: 312, height: 384 },
      preview: { width: 800, height: 600 },
      fullsize: { width: 1920, height: 1080 }
    }
  },
  // For cases where you absolutely need the original format
  original: {
    quality: 100,
    preserveFormat: true
  }
} as const;

// Helper function to get image dimensions based on screen size
export const getImageSize = (type: 'featured' | 'gallery', size: string) => {
  const config = IMAGE_CONFIG[type];
  if ('sizes' in config) {
    return config.sizes[size as keyof typeof config.sizes];
  }
  return undefined;
}; 