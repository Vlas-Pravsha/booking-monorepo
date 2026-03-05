export interface RestaurantReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  domain: string;
  description: string;
  shortDescription: string;
  logo?: string;
  heroImage?: string;
  gallery: string[];
  address: string;
  phone: string;
  email?: string;
  workHours: string;
  rating: number;
  reviewCount: number;
  cuisine: string;
  priceRange: string;
  features: string[];
  menuHighlights: MenuItem[];
  reviews: RestaurantReview[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    telegram?: string;
  };
}
