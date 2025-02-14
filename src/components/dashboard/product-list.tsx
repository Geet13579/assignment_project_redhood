'use client';

import { useEffect, useState } from "react";
import TablePage from "./product-list-table";
import { getProducts } from "@/app/action/product";

const TABLE_HEADINGS = [
  'S.No.',
  "Brand Name",
  "sku",
  "Weight",
  "Minimum Order Quantity",
  "Category",
  "Availability Status",
  "Action"
];

function OverviewPage() {
  const [productList, setProductList] = useState([]);
  const [limit, setLimit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getProducts();
        
        if (result.error) {
          //@ts-expect-error null
          setError(result.error);
        } else {
          setProductList(result.products || []);
          setLimit(result.limit || 0);
        }
      } catch (err) {
          //@ts-expect-error null

        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  if (loading) {
    return <div className="p-5">Loading products...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">Error loading products: {error}</div>;
  }

  return (
    <div>
      <div className="bg-white p-5 border border-[1.5px] border-borderColor mt-5 mb-10">
        <TablePage
          data={productList}
          limit={limit}
          tableHeading={TABLE_HEADINGS}
        />
      </div>
    </div>
  );
}

export default OverviewPage;