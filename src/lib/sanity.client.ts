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
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Function to fetch all projects
export async function getProjects() {
  try {
    return await client.fetch(
      `*[_type == "project"] | order(ndertuar desc) {
        _id,
        title,
        slug,
        description,
        "year": ndertuar,
        featuredImage,
        hapesira,
        apartamente,
        gallery
      }`
    )
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Return empty array on error
  }
}

// Function to fetch a single project by slug
export async function getProject(slug: string) {
  if (!slug) {
    console.error('No slug provided to getProject function');
    return null;
  }
  
  try {
    return await client.fetch(
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
    )
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    return null; // Return null on error
  }
}

// Check Sanity studio connection and status
export async function checkSanityStatus() {
  try {
    // Try to fetch one project to see if we have a valid connection
    const testQuery = await client.fetch(`*[_type == "project"][0] { _id }`)
    
    // Return connection status
    return {
      connected: true,
      projectCount: await client.fetch(`count(*[_type == "project"])`)
    }
  } catch (error) {
    console.error('Error connecting to Sanity:', error)
    return {
      connected: false,
      projectCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
} 