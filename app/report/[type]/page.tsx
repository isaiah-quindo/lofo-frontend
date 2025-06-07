'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useReport } from '../../context/ReportContext';
import { useAuth } from '../../context/AuthContext';
import Philippines from 'philippines';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import toast from 'react-hot-toast';

type ItemType = 'lost' | 'found';

interface FormData {
  name: string;
  description: string;
  itemType: ItemType;
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

export default function ReportPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const router = useRouter();
  const { report } = useReport();
  const { user, isLoading } = useAuth();
  const [error, setError] = useState('');
  const cities = Philippines.cities;
  const provinces = Philippines.provinces;

  // Validate and set item type from params using React.use()
  const { type } = React.use(params);
  const itemType: ItemType = type === 'found' ? 'found' : 'lost';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    itemType,
    location: '',
    city: '',
    province: '',
    date: new Date(),
    user: '',
    reward: 0,
    contactType: 'Phone',
    contact: '',
    category: '',
    images: [],
  });

  // Update user ID when user data is available
  useEffect(() => {
    if (user?._id) {
      setFormData((prev) => ({
        ...prev,
        user: user._id,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Only show loading state while checking auth
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Only redirect if not loading and no user
  if (!isLoading && !user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user?._id) {
      setError('User not authenticated');
      toast.error(error);
      return;
    }

    // Ensure all required fields are filled
    if (
      !formData.category ||
      !formData.city ||
      !formData.province ||
      !formData.contact ||
      !formData.name
    ) {
      setError('Please fill in all required fields');
      toast.error(error);
      return;
    }

    try {
      // Construct the data object in the exact format expected by the backend
      const dataToSubmit = {
        name: formData.name,
        description: formData.description,
        itemType: formData.itemType,
        location: formData.location,
        city: formData.city,
        province: formData.province,
        date: formData.date,
        user: user._id, // Use user ID directly from auth context
        reward: Number(formData.reward),
        contactType: formData.contactType,
        contact: formData.contact,
        category: formData.category,
        images: formData.images,
      };

      await report(dataToSubmit);
      toast.success('Item reported successfully');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong, please try again.');
      toast.error(err?.message || 'Something went wrong, please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <h2 className="text-2xl font-bold text-center">
          Report {itemType} item
        </h2>
        <div className="mt-5 p-4 relative z-10 bg-white border border-gray-200 rounded-xl sm:mt-10 md:p-10 dark:bg-neutral-900 dark:border-neutral-700">
          <form onSubmit={handleSubmit}>
            {/* Item name */}
            <div className="mb-8 w-full">
              <label
                htmlFor="item-name"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Item Name
              </label>
              <input
                type="text"
                id="item-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-8 w-full">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Category
              </label>
              <select
                data-hs-select='{
  "hasSearch": true,
  "searchPlaceholder": "Search...",
  "searchClasses": "block w-full sm:text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-1 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-1.5 sm:py-2 px-3",
  "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
  "placeholder": "Select a category...",
  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
  "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
  "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div></div>",
  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}'
                className="hidden"
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Choose</option>
                <option value="">Choose</option>
                <option value="Bags">Bags</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
                <option value="Collector Items">Collector Items</option>
                <option value="Documents">Documents</option>
                <option value="Electronics">Electronics</option>
                <option value="Household">Household</option>
                <option value="Jewellry">Jewellry</option>
                <option value="Media">Media</option>
                <option value="Money">Money</option>
                <option value="Musical Equipment">Musical Equipment</option>
                <option value="Personal Accessories">
                  Personal Accessories
                </option>
                <option value="Pets">Pets</option>
                <option value="Sporting Goods">Sporting Goods</option>
                <option value="Tools">Tools</option>
                <option value="Toys">Toys</option>
                <option value="Transportation">Transportation</option>
                <option value="Wallet">Wallet</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-8 w-full">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Describe the item..."
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Location */}
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Location"
                  required
                />
              </div>

              {/* City */}
              <div className="mb-8 w-full">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  City
                </label>
                <select
                  data-hs-select='{
  "hasSearch": true,
  "searchPlaceholder": "Search...",
  "searchClasses": "block w-full sm:text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-1 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-1.5 sm:py-2 px-3",
  "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
  "placeholder": "Select a city...",
  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
  "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
  "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div></div>",
  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}'
                  className="hidden"
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                >
                  <option value="">Choose</option>
                  {cities.map((city, index) => (
                    <option key={`${city.name}-${index}`} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Province */}
              <div className="mb-8 w-full">
                <label
                  htmlFor="province"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Province
                </label>
                <select
                  data-hs-select='{
  "hasSearch": true,
  "searchPlaceholder": "Search...",
  "searchClasses": "block w-full sm:text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-1 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-1.5 sm:py-2 px-3",
  "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
  "placeholder": "Select a province...",
  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
  "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
  "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div></div>",
  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}'
                  className="hidden"
                  id="province"
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                  required
                >
                  <option value="">Choose</option>
                  {provinces.map((province, index) => (
                    <option
                      key={`${province.name}-${index}`}
                      value={province.name}
                    >
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Reward */}
            {itemType === 'lost' && (
              <div className="mb-8 w-full">
                <div>
                  <label
                    htmlFor="reward"
                    className="block text-sm font-medium mb-2 dark:text-white"
                  >
                    Do you want to offer a reward? (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="reward"
                      name="reward"
                      className="py-2.5 sm:py-3 px-4 ps-9 pe-16 block w-full border border-gray-200 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="0.00"
                      value={formData.reward}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reward: Number(e.target.value),
                        })
                      }
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                      <span className="text-gray-500 dark:text-neutral-500">
                        ₱
                      </span>
                    </div>
                    <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                      <span className="text-gray-500 dark:text-neutral-500">
                        PHP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upload images */}
            <div className="mb-4 sm:mb-8">
              <label
                htmlFor="images"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Images (Max 3)
              </label>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length > 3) {
                    setError('Maximum 3 images allowed');
                    return;
                  }
                  setFormData({ ...formData, images: files });
                }}
                className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-400"
              />
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = formData.images.filter(
                            (_, i) => i !== index
                          );
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            {/* Contact */}
            <div className="mb-8 w-full">
              <label
                htmlFor="contactType"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Where can people reach you?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  id="contactType"
                  value={formData.contactType}
                  onChange={(e) =>
                    setFormData({ ...formData, contactType: e.target.value })
                  }
                  required
                >
                  <option value="">Select contact type</option>
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  id="contact"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter contact"
                  required
                />
              </div>
            </div>

            <div className="mt-6 grid">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
