import { useEffect, useState } from "react";
import TablePage from "./product-list-table";
import { useTabStore } from '@/hooks/use-tabs';

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
  const [limit, setLimit] = useState([]);

  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setError(null);
    
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data', data)
      setProductList(data.products);
      setLimit(data.limit)
    } catch (error) {
      console.error('Error fetching products:', error);
    } 
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array since we only want to fetch once on mount

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