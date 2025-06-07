import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import { getItems } from '@/actions/getItems';
import { Item } from '../types/types';
import ItemCard from './components/ItemCard';

export default async function Home() {
  const foundItemsResponse = await getItems(1, 4, 'found');
  const lostItemsResponse = await getItems(1, 4, 'lost');
  const foundItems = foundItemsResponse.data.data as Item[];
  const lostItems = lostItemsResponse.data.data as Item[];

  return (
    <>
      <Header />
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Building
              <span className="bg-clip-text bg-linear-to-tl from-blue-600 to-violet-600 text-transparent px-3">
                honest culture
              </span>
              one platform at a time
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Lost something? Found something? Let's return it—together.
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            <Link
              className="inline-flex justify-center items-center gap-x-3 text-center bg-linear-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-hidden focus:from-violet-600 focus:to-blue-600 py-3 px-4"
              href="/report/found"
            >
              I found something
            </Link>
            <Link
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 focus:outline-hidden focus:border-blue-600 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:text-blue-500 dark:focus:border-blue-600"
              href="/report/lost"
            >
              I lost something
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 dark:bg-black-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl dark:text-white font-bold">Found Items</h2>
          <Link
            href="/items/found"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            View all
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-6">
          {foundItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl dark:text-white font-bold">Lost Items</h2>
          <Link
            href="/items/lost"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            View all
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-6">
          {lostItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
