import { NextResponse } from 'next/server';
import { getFreshProjects } from '@/lib/sanity.client';

// API route to fetch all projects
export async function GET() {
  try {
    const projects = await getFreshProjects();
    
    // Create response with proper cache headers
    const response = NextResponse.json(projects);
    
    // Set cache headers to ensure fresh data
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// Disable static optimization and force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching completely 