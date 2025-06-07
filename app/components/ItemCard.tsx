import React from 'react';
import Link from 'next/link';
import { Item } from '../../types/types';

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Link href={`/items/${item._id}`} key={item._id}>
      <div
        key={item._id}
        className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 col-span-1"
      >
        <div className="relative">
          <img
            className="w-full h-auto rounded-t-xl"
            src={item.images[0] ? item.images[0] : './default-item.jpg'}
            alt={item.name}
          />
          {item.itemType === 'lost' && (
            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500 absolute bottom-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              {item.reward
                ? item.reward.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '0'}{' '}
              PHP
            </span>
          )}
        </div>
        <div className="p-4 md:p-5 flex flex-col gap-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white text-left truncate">
            {item.name}
          </h3>
          <p className="text-gray-500 dark:text-neutral-400 inline-flex items-center text-sm m-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 me-1"
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
            {item.city}, {item.province}
          </p>
          <p className="text-gray-500 dark:text-neutral-400 inline-flex items-center text-sm m-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 me-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            {new Date(item.date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
