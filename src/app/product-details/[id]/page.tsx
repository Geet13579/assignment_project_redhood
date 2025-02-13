
import { ContentLayout } from "@/components/navbar/content-layout";
import { lazyLoad } from "@/lib/lazyLoading";


export default function ActiveTask() {

  const Index = lazyLoad(() => import('@/components/product-details/details'));

  return (
    <ContentLayout title="Dashboard">
      <>

        <Index/>


      </>
    </ContentLayout>
  );
}

