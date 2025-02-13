'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';


export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  // console.log('pathname', pathname.split('/'))
  useEffect(() => {
    if (!token && pathname !== '/' && pathname !== '/404' && pathname !== '/not-found' && pathname.split('/')[1] !=='vehicle-traking-page' && pathname !== '/forgot-password') {
      router.push('/');
    }
  }, [token, pathname, router]);

  const isLoginOrNotFound = pathname === '/' || pathname === '/404' || pathname === '/not-found' || pathname === '/forgot-password' || pathname.split('/')[1] === 'vehicle-traking-page';

  if (isLoginOrNotFound) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      {children}
    </Suspense>
  );
}
