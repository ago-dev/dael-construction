import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/sanity.client';

// API route to fetch all projects
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// Set revalidation to every hour
export const revalidate = 3600; 