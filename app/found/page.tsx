import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoundItems from '../components/FoundItems';

const FoundPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 dark:bg-black-900 text-center">
        <div className="flex justify-between items-center my-4">
          <h2 className="text-2xl dark:text-white font-bold w-full text-left">
            Found Items
          </h2>
          <a
            href="/report/found"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-non text-nowrap"
          >
            Report found item
          </a>
        </div>

        <FoundItems />
      </div>
      <Footer />
    </>
  );
};

export default FoundPage;
