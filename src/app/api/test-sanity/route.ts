import { NextResponse } from 'next/server';
import { getFreshProjects, checkSanityStatus } from '@/lib/sanity.client';

export async function GET() {
  try {
    // Check Sanity connection
    const status = await checkSanityStatus();
    
    // Get fresh projects
    const projects = await getFreshProjects();
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      sanityStatus: status,
      projectCount: projects.length,
      projectTitles: projects.map((p: any) => p.title),
      environment: process.env.NODE_ENV,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.substring(0, 8) + '...',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { 
        error: 'Test failed', 
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'; 