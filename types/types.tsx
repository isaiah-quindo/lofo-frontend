export interface Item {
  id: string;
  name: string;
  itemType: 'found' | 'lost';
  reward: number;
  description: string;
  images: string[];
  category: string[];
  date: Date;
  province: string;
  contactType: string;
  contact: number;
  user: string;
}
