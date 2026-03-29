import type {
  RestaurantMenuDraft,
  RestaurantReviewDraft,
  RestaurantTable,
  RestaurantUpsertPayload,
} from "@/entities/restaurant";

export const createEmptyMenuHighlight = (): RestaurantMenuDraft => ({
  description: "",
  name: "",
  price: 0,
});

export const createEmptyReview = (): RestaurantReviewDraft => ({
  author: "",
  rating: 5,
  text: "",
});

export const createEmptyTable = (index: number): RestaurantTable => ({
  name: `Стіл ${String(index + 1)}`,
  seats: 2,
});

export function countEnabledSiteSections(
  draft: Pick<
    RestaurantUpsertPayload,
    "showGallery" | "showMenu" | "showReviews"
  >
) {
  return [draft.showGallery, draft.showMenu, draft.showReviews].filter(Boolean)
    .length;
}

export function countSiteContentItems(
  draft: Pick<RestaurantUpsertPayload, "gallery" | "menuHighlights" | "reviews">
) {
  return (
    draft.gallery.length + draft.menuHighlights.length + draft.reviews.length
  );
}

export const removeItemAtIndex = <T>(items: T[], targetIndex: number): T[] =>
  items.filter((_item, itemIndex) => itemIndex !== targetIndex);

export const patchItemAtIndex = <T>(
  items: T[],
  targetIndex: number,
  patch: Partial<T>
): T[] => {
  const nextItems = items.map((item) => ({ ...item }));
  const currentItem = nextItems[targetIndex];

  if (!currentItem) {
    return items;
  }

  nextItems[targetIndex] = {
    ...currentItem,
    ...patch,
  };

  return nextItems;
};
