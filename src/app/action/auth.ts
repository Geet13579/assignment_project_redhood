// app/actions/auth.ts
'use server'

import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { 
      error: "Please fill in all fields"
    }
  }

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username, 
        password,
        expiresInMins: 30 
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Login failed" };
    }

    const data = await response.json();
    
    // Store token in an HTTP-only cookie
    cookies().set('authToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 60, // 30 minutes
      path: '/'
    });

    // Return user data (excluding sensitive info)
    return {
      success: true,
      user: {
        id: data.id,
        username: data.username,
        gender: data.gender,
        image: data.image,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      }
    };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
}

export async function logout() {
  cookies().delete('authToken');
  return { success: true };
}

export async function getUserData() {
  const token = cookies().get('authToken')?.value;
  
  if (!token) {
    return null;
  }
  
  // You could validate the token here or fetch fresh user data if needed
  
  // For now, we'll just return a simple object indicating the user is logged in
  return {
    isLoggedIn: true
  };
}