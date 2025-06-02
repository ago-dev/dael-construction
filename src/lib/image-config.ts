// Image configuration for Sanity images - Performance Optimized
export const IMAGE_CONFIG = {
  // Thumbnail images (project lists, previews)
  thumbnail: {
    format: 'png' as const,
    quality: 85, // Good balance of quality/performance
    sizes: {
      mobile: { width: 300, height: 225 },
      tablet: { width: 400, height: 300 },
      desktop: { width: 528, height: 384 }
    }
  },
  
  // Gallery preview images (carousel, lightbox preview)
  gallery: {
    format: 'png' as const,
    quality: 90, // High quality but optimized
    sizes: {
      preview: { width: 1200, height: 800 },
      fullscreen: { width: 1920, height: 1080 }
    }
  },
  
  // Featured/hero images (main project images)
  featured: {
    format: 'png' as const,
    quality: 95, // Near-perfect quality
    sizes: {
      mobile: { width: 600, height: 400 },
      tablet: { width: 1000, height: 667 },
      desktop: { width: 1400, height: 933 },
      large: { width: 1920, height: 1080 }
    }
  },
  
  // For cases where you absolutely need the original (rare)
  original: {
    quality: 100,
    preserveFormat: true
  }
} as const;

// Performance recommendations by use case
export const PERFORMANCE_SETTINGS = {
  // For project thumbnails (fast loading)
  THUMBNAIL: { quality: 85, maxWidth: 528 },
  
  // For gallery previews (good quality, reasonable size)
  GALLERY_PREVIEW: { quality: 90, maxWidth: 1200 },
  
  // For fullscreen/detailed view (high quality)
  FULLSCREEN: { quality: 95, maxWidth: 1920 },
  
  // For print/original quality (only when needed)
  PRINT_QUALITY: { quality: 100, maxWidth: null }
} as const;

// Helper function to get image dimensions based on screen size
export const getImageSize = (type: 'thumbnail' | 'gallery' | 'featured', size: string) => {
  const config = IMAGE_CONFIG[type];
  if ('sizes' in config) {
    return config.sizes[size as keyof typeof config.sizes];
  }
  return undefined;
}; 