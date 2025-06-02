import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Use environment variables with fallbacks for build-time safety
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Show warning instead of throwing error
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && typeof window !== 'undefined') {
  console.warn('Warning: Missing environment variable NEXT_PUBLIC_SANITY_PROJECT_ID');
}

export default defineConfig({
  name: 'dael-construction',
  title: 'DAEL Construction CMS',
  
  projectId,
  dataset,
  
  basePath: '/studio',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Configure image upload settings
  form: {
    // Configure image upload settings
    image: {
      // Set default image processing options
      directUploads: true,
    }
  }
}) 