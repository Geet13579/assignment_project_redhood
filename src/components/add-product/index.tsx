'use client'
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

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

export default function ProductForm() {
  const [formData, setFormData] = useState<ProductData>({
    id: 1,
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
    dimensions: { width: 0, height: 0, depth: 0 },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: 0,
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      barcode: '',
      qrCode: ''
    },
    thumbnail: '',
    images: []
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductData, string>>>({});
  const [newTag, setNewTag] = useState('');
  const [newReview, setNewReview] = useState<Review>({
    rating: 5,
    comment: '',
    date: new Date().toISOString(),
    reviewerName: '',
    reviewerEmail: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [name]: parseFloat(value) || 0
      }
    }));
  };

  const handleTagAdd = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleReviewAdd = () => {
    if (newReview.comment && newReview.reviewerName && newReview.reviewerEmail) {
      setFormData(prev => ({
        ...prev,
        reviews: [...prev.reviews, { ...newReview, date: new Date().toISOString() }]
      }));
      setNewReview({
        rating: 5,
        comment: '',
        date: new Date().toISOString(),
        reviewerName: '',
        reviewerEmail: ''
      });
    }
  };

  const handleReviewRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
        const response = await fetch('https://dummyjson.com/products/add',
        { method: "POST", headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(formData),});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
   
        if(response.ok){
            alert("Product Add Successfully!")
            window.location.reload()
        }
       
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    // console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className='text-center font-bold text-2xl'>Add Product</h1>
      <div className="space-y-4">
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
            className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
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

          <div>
            <label className="block text-sm font-medium mb-1">Width</label>
            <input
              type="number"
              name="width"
              value={formData.dimensions.width}
              onChange={handleDimensionChange}
              step="0.01"
              className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Height</label>
            <input
              type="number"
              name="height"
              value={formData.dimensions.height}
              onChange={handleDimensionChange}
              step="0.01"
              className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Depth</label>
            <input
              type="number"
              name="depth"
              value={formData.dimensions.depth}
              onChange={handleDimensionChange}
              step="0.01"
              className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Tags</h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Enter a tag"
          />
          <button
            type="button"
            onClick={handleTagAdd}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Add Tag
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleTagRemove(tag)}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </span>
          ))}
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

          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
              className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary"
              rows={3}
            />
          </div>

          <button
            type="button"
            onClick={handleReviewAdd}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Add Review
          </button>
        </div>

        <div className="space-y-4">
          {formData.reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded flex justify-between">
              <div>
                <div className="font-medium">{review.reviewerName}</div>
                <div className="text-sm text-gray-500">{review.reviewerEmail}</div>
                <div className="mt-2">Rating: {review.rating}/5</div>
                <div className="mt-1">{review.comment}</div>
              </div>
              <button
                type="button"
                onClick={() => handleReviewRemove(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}