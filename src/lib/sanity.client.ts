import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Use environment variables with fallbacks for build-time safety
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Create a warning only if in development mode
if (!projectId && process.env.NODE_ENV === 'development') {
  console.warn('Warning: Missing environment variable NEXT_PUBLIC_SANITY_PROJECT_ID')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  // Add token for write access if available
  token: process.env.SANITY_API_TOKEN,
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Enhanced function for high-quality images
export function urlForHighQuality(source: any) {
  return builder.image(source).format('png').quality(100)
}

// Function specifically for preserving original format and quality
export function urlForOriginal(source: any) {
  return builder.image(source).quality(100)
}

// Custom function with specific format and quality control
export function urlForCustom(source: any, format: 'png' | 'jpg' | 'webp' = 'png', quality: number = 100) {
  return builder.image(source).format(format).quality(quality)
}

// Function for responsive images with high quality
export function urlForResponsive(source: any, width: number, height?: number) {
  const imageBuilder = builder.image(source).format('png').quality(100).width(width);
  return height ? imageBuilder.height(height) : imageBuilder;
}

// Function to force PNG and prevent any WebP conversion
export function urlForPurePNG(source: any, width?: number, height?: number) {
  let imageBuilder = builder.image(source)
    .format('png')
    .quality(100);
  
  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  
  return imageBuilder;
}

// Performance-optimized image functions
export function urlForThumbnail(source: any) {
  return builder.image(source)
    .format('png')
    .quality(85)
    .width(400)
    .height(300);
}

export function urlForMediumQuality(source: any, width: number = 800, height?: number) {
  let imageBuilder = builder.image(source)
    .format('png')
    .quality(90)
    .width(width);
  
  if (height) imageBuilder = imageBuilder.height(height);
  return imageBuilder;
}

export function urlForGalleryPreview(source: any) {
  return builder.image(source)
    .format('png')
    .quality(85)
    .width(1200)
    .height(800);
}

export function urlForFullscreen(source: any) {
  return builder.image(source)
    .format('png')
    .quality(95)
    .width(1920)
    .height(1080);
}

// Smart responsive image function
export function urlForResponsiveOptimized(source: any, size: 'small' | 'medium' | 'large' | 'xl') {
  const configs = {
    small: { width: 400, height: 300, quality: 80 },
    medium: { width: 800, height: 600, quality: 85 },
    large: { width: 1200, height: 800, quality: 90 },
    xl: { width: 1920, height: 1080, quality: 95 }
  };
  
  const config = configs[size];
  return builder.image(source)
    .format('png')
    .quality(config.quality)
    .width(config.width)
    .height(config.height);
}

// Function to get the raw asset URL without any processing
export function urlForRawAsset(source: any) {
  // Get the raw asset reference and construct direct URL
  if (source?.asset?._ref) {
    const ref = source.asset._ref;
    const [, , dimensions] = ref.split('-');
    const [width, height] = dimensions.split('x');
    
    // Return direct asset URL
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ejx17wi7'}/production/${ref.replace('image-', '').replace(`-${dimensions}`, '')}-${dimensions}.png`;
  }
  return builder.image(source).url();
}

// Function to fetch all projects with fresh data
export async function getProjects(fresh = false) {
  try {
    const query = `*[_type == "project"] | order(ndertuar desc) {
      _id,
      title,
      slug,
      description,
      "year": ndertuar,
      featuredImage,
      hapesira,
      apartamente,
      gallery
    }`;
    
    // Create a fresh client if we need fresh data
    const clientToUse = fresh ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
    }) : client;
    
    const result = await clientToUse.fetch(query);
    
    return result || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Additional error details
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    
    // Try a simpler query as fallback
    try {
      console.log('Attempting fallback projects query...');
      const fallbackResult = await client.fetch(`*[_type == "project"]`);
      return fallbackResult || [];
    } catch (fallbackError) {
      console.error('Fallback projects query failed:', fallbackError);
      return []; // Return empty array on error
    }
  }
}

// Function to fetch fresh projects (bypassing all caches)
export async function getFreshProjects() {
  return getProjects(true);
}

// Function to fetch a single project by slug
export async function getProject(slug: string) {
  if (!slug) {
    console.error('No slug provided to getProject function');
    return null;
  }
  
  try {
    const result = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        "year": ndertuar,
        featuredImage,
        gallery,
        hapesira,
        apartamente,
        ndertuar
      }`,
      { slug }
    );
    
    return result;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    
    // Additional error details for debugging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Try a simpler query as fallback
    try {
      console.log('Attempting fallback query...');
      const fallbackResult = await client.fetch(
        `*[_type == "project" && slug.current == $slug][0]`,
        { slug }
      );
      return fallbackResult;
    } catch (fallbackError) {
      console.error('Fallback query also failed:', fallbackError);
      return null;
    }
  }
}

// Check Sanity studio connection and status
export async function checkSanityStatus() {
  try {
    // Try to fetch one project to see if we have a valid connection
    const testQuery = await client.fetch(`*[_type == "project"][0] { _id }`);
    
    // Return connection status
    return {
      connected: true,
      projectCount: await client.fetch(`count(*[_type == "project"])`)
    };
  } catch (error) {
    console.error('Error connecting to Sanity:', error);
    
    // Additional error details
    if (error instanceof Error) {
      console.error('Sanity connection error message:', error.message);
    }
    
    return {
      connected: false,
      projectCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 