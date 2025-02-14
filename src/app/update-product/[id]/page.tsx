'use client'
import React, { useState, useEffect } from 'react';
import { updateProduct,getProductById } from '@/app/action/product';
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface ProductData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
}

export default function ProductEditForm() {

  const [formData, setFormData] = useState<ProductData>({
    id: 0,
    title: '',
    description: '',
    category: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: '',
    sku: '',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: 0,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: ''
    },
    thumbnail: '',
    images: []
  });
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const [newReview, setNewReview] = useState<Review>({
    rating: 5,
    comment: '',
    date: new Date().toISOString(),
    reviewerName: '',
    reviewerEmail: ''
  });
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      try {
        const result = await getProductById(id.toString());
        
        if ('error' in result) {
          setError(result.error);
        } else {
          setFormData(result);
        }
      } catch (err) {
        console.error("Error in component:", err);
      } finally {
      }
    }
    
    loadProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          //@ts-expect-error null
          ...prev[parent as keyof ProductData],
          [child]: value
        }
      }));
    } else {
      const numericFields = ['price', 'discountPercentage', 'stock', 'weight'];
      const finalValue = numericFields.includes(name) ? parseFloat(value) || 0 : value;
      
      setFormData(prev => ({
        ...prev,
        [name]: finalValue
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedFormData = {
        ...formData,
        meta: {
          ...formData.meta,
          updatedAt: new Date().toISOString()
        }
      };

      console.log('updatedFormData', updatedFormData)

      const result = await updateProduct(updatedFormData);

      console.log('result', result)
      
      if ('success' in result) {
        alert("Product updated successfully!");
        window.location.reload();
      } else {
        setError(result.error || 'Failed to update product');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white space-y-6">
      <h1 className='text-center font-bold text-2xl'>Edit Product</h1>
      <div className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <h2 className="text-lg font-bold">Basic Information</h2>
        <div className="space-y-4 border p-4 rounded">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="border-[1.5px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Pricing & Inventory</h2>
        <div className="space-y-4 border p-4 rounded">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Discount (%)</label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                step="0.01"
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Physical Specifications</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Weight</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              step="0.01"
              className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
            />
          </div>

        </div>
      </div>


      <div className="space-y-4">
        <h2 className="text-lg font-bold">Reviews</h2>
        <div className="space-y-4 border p-4 rounded">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Reviewer Name</label>
              <input
                type="text"
                value={newReview.reviewerName}
                onChange={(e) => setNewReview(prev => ({ ...prev, reviewerName: e.target.value }))}
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reviewer Email</label>
              <input
                type="email"
                value={newReview.reviewerEmail}
                onChange={(e) => setNewReview(prev => ({ ...prev, reviewerEmail: e.target.value }))}
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              />
            </div>
            </div>
            </div>
            </div>
            
      <div className="pt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary"
        >
         Update Product
        </button>
      </div>
            </form>
  )}
