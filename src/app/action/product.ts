// app/actions/products.ts
'use server'

import { cookies } from 'next/headers'

export async function getProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      products: data.products,
      limit: data.limit,
      total: data.total
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { 
      error: error instanceof Error ? error.message : "Failed to fetch products" 
    };
  }
}

export async function getProductById(id: string) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : "Failed to fetch product" 
    };
  }
}

export async function addProduct(formData: FormData) {
  const token = cookies().get('authToken')?.value;
  
  if (!token) {
    return { error: "You must be logged in to add a product" };
  }
  

  try {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({formData})
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Failed to add product" };
    }
    
    const data = await response.json();
    return { 
      success: true, 
      product: data 
    };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : "An error occurred while adding the product" 
    };
  }
}

export async function updateProduct(productData:any) {
    const token = cookies().get('authToken')?.value;
   
    if (!token) {
      return { error: "You must be logged in to update a product" };
    }
   
    try {
      const response = await fetch(`https://dummyjson.com/products/${productData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
     
      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || "Failed to update product" };
      }
     
      const data = await response.json();
      return {
        success: true,
        product: data
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "An error occurred while updating the product"
      };
    }
  }

export async function deleteProduct(id: string) {
  const token = cookies().get('authToken')?.value;
  
  if (!token) {
    return { error: "You must be logged in to delete a product" };
  }
  
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Failed to delete product" };
    }
    
    const data = await response.json();
    return { 
      success: true, 
      deleted: data 
    };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : "An error occurred while deleting the product" 
    };
  }
}