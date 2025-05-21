
export interface IAd {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  views?: number;
  price: {
    current: number;
    original?: number;
  };
  tag?: {
    text: string;
    type: 'new' | 'hot' | 'sale';
  };
  category: string;
}

export interface IAnnouncement {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  location: string;
  category: string;
  postedDate: string;
  rating: number;
  reviews: number;
  views: number;
  tag?: {
    text: string;
    type: 'new' | 'hot' | 'sale';
  };
}

export interface IProfile {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: { 
    current: number;
    original?: number;
  };
  location: string;
  category: string;
  postedDate: string;
  rating: number;
  reviews: number;
  views: number;
  tag?: {
    text: string;
    type: 'new' | 'hot' | 'sale';
  };
  age: number;
  height: string;
  weight: string;
  phone: string;
  email: string;
  availability: string[];
  services: string[];
  about: string;
}
