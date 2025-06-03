import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Optional: Add a secret token for security
    const secret = request.nextUrl.searchParams.get('secret');
    
    // You can set this in your environment variables for security
    if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Get the body to see what was updated
    const body = await request.json();
    console.log('Revalidation triggered:', body);

    // Revalidate specific paths
    revalidatePath('/');           // Home page
    revalidatePath('/projects');   // Projects page
    revalidatePath('/projects/[slug]', 'page'); // All project pages
    
    // Also revalidate the API route 
    revalidateTag('projects');

    console.log('Revalidation completed successfully');
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Projects revalidated successfully'
    });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { 
        message: 'Error revalidating', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
} 