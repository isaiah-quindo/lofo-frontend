import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LostItems from '../components/LostItems';

const LostPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 dark:bg-black-900 text-center">
        <div className="flex justify-between items-center my-4">
          <h2 className="text-2xl dark:text-white font-bold text-left">
            Lost Items
          </h2>
          <Link
            href="/report/lost"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-hidden focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Report lost item
          </Link>
        </div>
        <LostItems />
      </div>
      <Footer />
    </>
  );
};

export default LostPage;
