'use client'
import { ContentLayout } from "@/components/navbar/content-layout";
// import Dashboard from '@/components/dashboard/dashboard'
import { lazyLoad } from "@/lib/lazyLoading";


export default function DashboardPage() {

  const Dashboard = lazyLoad(() => import("@/components/cre-report/dashboard"));


  return (
    <ContentLayout title="Dashboard">
      <>

        <Dashboard />


      </>
    </ContentLayout>
  );
}