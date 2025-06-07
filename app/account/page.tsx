'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Item } from '../../types/types';

const Account = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if no user
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchUserItems = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/items?user=${user._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (!res.ok) throw new Error('Failed to fetch items');

        const data = await res.json();
        setUserItems(data.data.data);
      } catch (error) {
        console.error('Error fetching user items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserItems();
  }, [user, router]);

  // Show nothing while checking auth status or redirecting
  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            My Account
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">
                Name
              </label>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {user.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">
                Email
              </label>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">
                Role
              </label>
              <p className="mt-1 text-lg text-gray-900 dark:text-white capitalize">
                {user.role}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={logout}
              className="inline-flex justify-center items-center gap-x-3 text-center bg-red-600 hover:bg-red-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-neutral-800"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              My Items
            </h2>
            <Link
              href="/items/new"
              className="inline-flex justify-center items-center gap-x-2 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition py-2 px-3 dark:focus:ring-offset-neutral-800"
            >
              Add New Item
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-4">
              <p className="text-gray-500 dark:text-neutral-400">
                Loading items...
              </p>
            </div>
          ) : userItems.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 dark:text-neutral-400">
                No items found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userItems.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 dark:border-neutral-700 rounded-lg overflow-hidden"
                >
                  <Image
                    className="w-full h-48 object-cover"
                    src={item.images[0] || '/default-item.jpg'}
                    alt={item.name}
                    width={400}
                    height={192}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-neutral-400 text-sm mb-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white capitalize">
                        {item.itemType}
                      </span>
                      <Link
                        href={`/items/${item._id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
