import type {
  MenuItem,
  RestaurantReview,
  RestaurantTable,
  RestaurantUpsertPayload,
} from "../../model/types";

export interface RestaurantSettingsSectionProps {
  value: RestaurantUpsertPayload;
  onChange: (patch: Partial<RestaurantUpsertPayload>) => void;
}

export const cloneMenuItems = (menuHighlights: MenuItem[]): MenuItem[] =>
  menuHighlights.map((item) => ({ ...item }));

export const cloneReviews = (
  reviews: RestaurantUpsertPayload["reviews"]
): RestaurantUpsertPayload["reviews"] =>
  reviews.map((review) => ({ ...review }));

export const cloneTables = (tables: RestaurantTable[]): RestaurantTable[] =>
  tables.map((table) => ({ ...table }));

export const buildEmptyMenuItem = (): MenuItem => ({
  description: "",
  image: "",
  name: "",
  price: 0,
});

export const buildEmptyReview = (): Omit<RestaurantReview, "id"> => ({
  author: "",
  avatar: "",
  date: "",
  rating: 5,
  text: "",
});

export const buildEmptyGalleryItem = (): string => "";

export const buildEmptyTable = (index: number): RestaurantTable => ({
  name: `Стіл ${String(index + 1)}`,
  seats: 2,
});

export const removeItemAtIndex = <T>(items: T[], index: number): T[] =>
  items.filter((_item, itemIndex) => itemIndex !== index);
