'use client';

import { useEffect, useState } from 'react';
import { checkSanityStatus } from '@/lib/sanity.client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkStatus() {
      try {
        const result = await checkSanityStatus();
        setStatus(result);
      } catch (error) {
        setStatus({ 
          connected: false, 
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        setLoading(false);
      }
    }
    
    // Check status immediately
    checkStatus();
    
    // Redirect to studio after 3 seconds
    const timer = setTimeout(() => {
      router.push('/studio');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <h1 style={{ marginBottom: '20px' }}>DAEL Construction Admin</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <p>You will be redirected to the Sanity Studio in a few seconds...</p>
        <p><Link href="/studio" style={{ color: 'blue', textDecoration: 'underline' }}>Click here</Link> if you're not redirected automatically.</p>
      </div>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px',
        marginBottom: '30px' 
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Sanity Status:</h2>
        {loading ? (
          <p>Checking Sanity connection...</p>
        ) : status?.connected ? (
          <div>
            <p style={{ color: 'green', fontWeight: 'bold' }}>✓ Connected</p>
            <p>Projects found: {status.projectCount}</p>
          </div>
        ) : (
          <div>
            <p style={{ color: 'red', fontWeight: 'bold' }}>✗ Not connected</p>
            {status?.error && <p>Error: {status.error}</p>}
          </div>
        )}
      </div>
      
      <div>
        <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Quick Links:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/studio" style={{ color: 'blue', textDecoration: 'underline' }}>
              Sanity Studio
            </Link> - Create and manage content
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
              Website Home
            </Link> - View the public website
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/projects" style={{ color: 'blue', textDecoration: 'underline' }}>
              Projects Page
            </Link> - View all projects
          </li>
        </ul>
      </div>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8f8f8', 
        borderRadius: '8px',
        marginTop: '30px',
        borderLeft: '3px solid #3333dd'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Using Sanity Studio:</h2>
        <ul style={{ listStylePosition: 'inside', paddingLeft: '10px' }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>Creating a Project:</strong> Click "Projects" then "Create new document"
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Updating the URL (Slug):</strong> After changing the title, click the "Generate" button in the Slug field
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Preview:</strong> Save your changes, then view the project on the website
          </li>
        </ul>
      </div>
    </div>
  );
} 