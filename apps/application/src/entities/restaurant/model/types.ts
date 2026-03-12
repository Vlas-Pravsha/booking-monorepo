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

export interface RestaurantTable {
  id?: string;
  name: string;
  seats: number;
}

export interface RestaurantSocialLinks {
  instagram?: string;
  facebook?: string;
  telegram?: string;
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
  openingTime: string;
  closingTime: string;
  averageDuration: number;
  rating: number;
  reviewCount: number;
  cuisine: string;
  priceRange: string;
  showMenu: boolean;
  showGallery: boolean;
  showReviews: boolean;
  features: string[];
  menuHighlights: MenuItem[];
  reviews: RestaurantReview[];
  tables: RestaurantTable[];
  socialLinks?: RestaurantSocialLinks;
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantUpsertPayload {
  address: string;
  averageDuration: number;
  closingTime: string;
  cuisine: string;
  description: string;
  domain: string;
  email?: string;
  features: string[];
  gallery: string[];
  heroImage?: string;
  logo?: string;
  menuHighlights: MenuItem[];
  name: string;
  openingTime: string;
  phone: string;
  priceRange: string;
  reviews: Omit<RestaurantReview, "id">[];
  shortDescription: string;
  showGallery: boolean;
  showMenu: boolean;
  showReviews: boolean;
  socialLinks: RestaurantSocialLinks;
  tables: RestaurantTable[];
  workHours: string;
}
