'use client'
import { useEffect } from "react";
import { ContentLayout } from "@/components/navbar/content-layout";
// import Dashboard from '@/components/dashboard/dashboard'
import { lazyLoad } from "@/lib/lazyLoading";
import { useAnalyticsStore } from "@/hooks/analytics";


export default function DashboardPage() {

  const { analytics, fetchAnalyticsList} = useAnalyticsStore()

  const Dashboard = lazyLoad(() => import("@/components/dashboard"));


  useEffect(()=>{
    fetchAnalyticsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetchAnalyticsList])

  return (
    <ContentLayout title="Dashboard">
      <>


        <Dashboard 
        //@ts-expect-error null
        analytics={analytics}/>


      </>
    </ContentLayout>
  );
}

