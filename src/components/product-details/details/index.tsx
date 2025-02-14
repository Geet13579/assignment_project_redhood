"use client";

import { useEffect, useState } from "react";
import HeaderTab from "@/components/tabs/headerTabs";
import DeatilsPage from "./deatils-page";
import PhotosPage from "./product-photos";
import PriceDetail from "./price-detail";
import ReviewDetails from "./review-details";
import { useParams } from "next/navigation";
import { useTabStore } from "@/hooks/use-tabs";
import { getProductById } from "@/app/action/product";

const cardData = [
  { label: "Details", active: true, value: "Details" },
  { label: "Photos", active: true, value: "Photos" },
  { label: "Price Detail", active: true, value: "Price Detail" },
  { label: "Review Details", active: true, value: "Review Details" }
];

const cardData1 = [{ label1: "Filter", icon: "" }];

export default function HeaderTabs() {
  const { id } = useParams();
  const { activeTab } = useTabStore();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await getProductById(id.toString());
        
        if ('error' in result) {
          setError(result.error);
        } else {
          setProduct(result);
        }
      } catch (err) {
        console.error("Error in component:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <HeaderTab cardData={cardData} cardData1={cardData1} />
      {product ? (
        <>
          {activeTab === "Details" && <DeatilsPage product={product} />}
          {activeTab === "Photos" && <PhotosPage product={product}/>}
          {activeTab === "Price Detail" && <PriceDetail product={product} />}
          {activeTab === "Review Details" && <ReviewDetails product={product}/>}
        </>
      ) : (
        <div className="flex items-center justify-center p-4">
          <div className="text-gray-600">No product data available</div>
        </div>
      )}
    </div>
  );
}