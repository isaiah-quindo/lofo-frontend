export interface Item {
  _id: string;
  name: string;
  description: string;
  itemType: 'found' | 'lost';
  category: string[];
  location: string;
  city: string;
  province: string;
  date: string;
  images: string[];
  reward?: number;
  contact: string;
  contactType: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}
