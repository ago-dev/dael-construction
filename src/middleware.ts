import { NextRequest, NextResponse } from 'next/server';

// This middleware just demonstrates how you could add authentication in front of the studio
export function middleware(req: NextRequest) {
  // Studio paths that we want to potentially protect
  const isStudioRoute = req.nextUrl.pathname.startsWith('/studio');
  
  if (isStudioRoute) {
    // In production, you would add actual authentication here
    // For now, we're just passing through all requests
    return NextResponse.next();
    
    // Example of how to add basic auth (uncomment to use)
    // const basicAuth = req.headers.get('authorization');
    // if (basicAuth) {
    //   const authValue = basicAuth.split(' ')[1];
    //   const [user, pwd] = atob(authValue).split(':');
    // 
    //   if (user === 'admin' && pwd === 'password') {
    //     return NextResponse.next();
    //   }
    // }
    // 
    // return new NextResponse('Authentication Required', {
    //   status: 401,
    //   headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    // });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*'],
}; 