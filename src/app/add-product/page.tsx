
// import { ContentLayout } from "@/components/navbar/content-layout";
import { lazyLoad } from "@/lib/lazyLoading";


export default function DashboardPage() {

  const AddProduct = lazyLoad(() => import("@/components/add-product"));

  return (
    // <ContentLayout title="Add Product">
      <>
        <AddProduct />
      </>
    // </ContentLayout>
  );
}

