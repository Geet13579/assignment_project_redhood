'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import AdminPanelLayout with loading state
const AdminPanelLayout = dynamic(() => import("@/components/admin-panel-layout"), {
  loading: () => <div className="flex items-center justify-center h-screen">

<div className="relative flex justify-center items-center">
  <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary" />
  {/* <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" /> */}
</div>

  </div>,
  ssr: false
});


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
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </Suspense>
  );
}
