'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface ItemData {
  name: string;
  description: string;
  itemType: 'lost' | 'found';
  location: string;
  city: string;
  province: string;
  date: Date;
  user: string;
  reward: number;
  contactType: string;
  contact: string;
  category: string;
  images: File[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  signup: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<void>;
  report: (data: ItemData) => Promise<void>;
  checkUserStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:4000/api/v1';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup', '/items'];

  // Check if user is logged in on initial load
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // Ensure we're in the browser environment
      if (typeof window === 'undefined') return;

      // Make the API call without checking localStorage
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        // Handle both response structures (data.data.user and data.data.doc)
        const userData = data.data.user || data.data.doc;
        if (userData) {
          setUser(userData);
        } else {
          throw new Error('Invalid user data structure');
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();

      // Set user data
      setUser(data.data.user);

      // Redirect to home page
      router.push('/');
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      toast.success('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    } finally {
      setUser(null);
      router.push('/');
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ name, email, password, passwordConfirm }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.error.code === 11000) {
          toast.error('Email already in use');
        }
        toast.error(errorData.message || 'Signup failed');
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await res.json();

      // Set user data
      setUser(data.data.user);

      // Redirect to home page
      router.push('/');
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Failed to signup. Please try again.');
    }
  };

  const report = async (data: ItemData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('itemType', data.itemType);
      formData.append('location', data.location);
      formData.append('city', data.city);
      formData.append('province', data.province);
      formData.append('date', data.date.toISOString());
      formData.append('user', data.user);
      formData.append('reward', data.reward.toString());
      formData.append('contactType', data.contactType);
      formData.append('contact', data.contact);
      formData.append('category', data.category);

      data.images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create item');
      }

      router.push('/');
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        signup,
        report,
        checkUserStatus: checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
