'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { Item } from '@/types/types';

// The page component
function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const { id } = React.use(params);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`);
      const data = await res.json();
      const item = data.data.doc;
      setItem(item);
    };
    fetchItem();
  }, [id]);

  // Convert string date to Date object
  if (!item) {
    return (
      <>
        <Header />
        <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 dark:bg-black-900 py-10">
          Loading...
        </div>
        <Footer />
      </>
    );
  }
  const itemDate = new Date(item.date);

  return (
    <>
      <Head>
        <title>{item.name} | Lost and Found</title>
        <meta name="description" content={item.description} />
      </Head>
      <Header />
      <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 dark:bg-black-900 py-10">
        <div className="flex gap-8">
          <div className="flex-1">
            <Image
              className="rounded-xl w-full h-auto"
              src={item.images[0] ? item.images[0] : './default-item.jpg'}
              alt={item.name}
              width={800}
              height={600}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
            <div className="space-y-3">
              <dl className="flex flex-col sm:flex-row gap-1">
                <dt className="min-w-40">
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    Description:
                  </span>
                </dt>
                <dd className="text-md text-gray-800 dark:text-neutral-200 pb-1">
                  {item.description}
                </dd>
              </dl>
              {item.reward === 0 ? (
                ' '
              ) : (
                <dl className="flex flex-col sm:flex-row gap-1">
                  <dt className="min-w-40">
                    <span className="block text-sm text-gray-500 dark:text-neutral-500">
                      Reward:
                    </span>
                  </dt>
                  <dd>
                    <ul>
                      <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 font-bold me-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                          />
                        </svg>
                        {item.reward && item.reward > 0
                          ? item.reward
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : 0}{' '}
                        PHP
                      </li>
                    </ul>
                  </dd>
                </dl>
              )}

              <dl className="flex flex-col sm:flex-row gap-1">
                <dt className="min-w-40">
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    {item.itemType === 'found' ? 'Place found' : 'Last seen'}:
                  </span>
                </dt>
                <dd>
                  <ul>
                    <li className="me-1 after:content-[','] inline-flex items-center text-sm text-gray-800 dark:text-neutral-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 me-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                      {item.location}, {item.city}, {item.province}
                    </li>
                  </ul>
                </dd>
              </dl>

              <dl className="flex flex-col sm:flex-row gap-1">
                <dt className="min-w-40">
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    {item.itemType === 'found' ? 'Date found' : 'Date lost'}:
                  </span>
                </dt>
                <dd>
                  <ul>
                    <li className="me-1 after:content-[','] inline-flex items-center text-sm text-gray-800 dark:text-neutral-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 me-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      {itemDate.toLocaleString('en-us', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </li>
                  </ul>
                </dd>
              </dl>

              <dl className="flex flex-col sm:flex-row gap-1">
                <dt className="min-w-40">
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    Category:
                  </span>
                </dt>
                <dd>
                  <ul>
                    <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200">
                      {item.category
                        .map((category: string) => category)
                        .join(', ')}
                    </li>
                  </ul>
                </dd>
              </dl>

              <dl className="flex flex-col sm:flex-row gap-1">
                <dt className="min-w-40">
                  <span className="block text-sm text-gray-500 dark:text-neutral-500">
                    Cantact:
                  </span>
                </dt>
                <dd>
                  <ul>
                    <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200">
                      {user ? (
                        item.contact
                      ) : (
                        <Link
                          href="/login"
                          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Login to view contact details
                        </Link>
                      )}
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ItemPage;
