// import Link from "next/link";

// import { ContentLayout } from "@/components/navbar/content-layout";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator
// } from "@/components/ui/breadcrumb";

// export default function DashboardPage() {
//   return (
//     <ContentLayout title="Dashboard">
//       <Breadcrumb>
//       {/* <BreadcrumbPage>Dashboard</BreadcrumbPage> */}
//         {/* <BreadcrumbList>
//           <BreadcrumbItem>
//             <BreadcrumbLink asChild>
//               <Link href="/">Home</Link>
//             </BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbPage>Dashboard</BreadcrumbPage>
//           </BreadcrumbItem>
//         </BreadcrumbList> */}
//       </Breadcrumb>
//     </ContentLayout>
//   );
// }
'use client'
import React from 'react'
import dynamic from 'next/dynamic'

// dynamic(() => import('../components/A'))

// const LoginPage = dynamic(() => import('@/components/Auth/login'))

const LoginPage = dynamic(
  () => import('@/components/auth/login'),
  {
    loading: () => <p>Data Not Found..</p>,
  }
)

// import LoginPage from '@/components/Auth/login'

function page() {
  return (
    <div>
      <LoginPage/>


    </div>
  )
}

export default page


