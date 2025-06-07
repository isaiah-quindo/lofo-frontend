import { Item } from '@/types/types';

export const getItems = async (
  page: number,
  limit: number,
  itemType: string,
  search?: string,
  category?: string,
  city?: string,
  province?: string
) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      itemType: itemType,
      ...(search && { search }),
      ...(category && { category }),
      ...(city && { city }),
      ...(province && { province }),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items?${params.toString()}`,
      {
        next: { revalidate: 30 }, // Cache for 30 seconds
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
