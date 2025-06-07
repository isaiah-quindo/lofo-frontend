'use client';

import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

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

interface ReportContextType {
  report: (data: ItemData) => Promise<void>;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const report = async (data: ItemData) => {
    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Append all required fields
      formData.append('name', data.name);
      formData.append('description', data.description || '');
      formData.append('itemType', data.itemType);
      formData.append('location', data.location || '');
      formData.append('city', data.city);
      formData.append('province', data.province);
      formData.append('date', data.date.toISOString());
      formData.append('user', data.user);
      formData.append('reward', data.reward.toString());
      formData.append('contactType', data.contactType);
      formData.append('contact', data.contact);
      formData.append('category[]', data.category);

      // Append each image to formData
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

      // Redirect to home page on success
      router.push('/');
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  };

  return (
    <ReportContext.Provider value={{ report }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
}

export default ReportContext;
