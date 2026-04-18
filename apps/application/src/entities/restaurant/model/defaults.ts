import type {
  Restaurant,
  RestaurantMenuDraft,
  RestaurantReviewDraft,
  RestaurantTable,
  RestaurantUpsertPayload,
} from "./types";

const DEFAULT_OPENING_TIME = "10:00";
const DEFAULT_CLOSING_TIME = "22:00";

export const DEFAULT_FEATURES: readonly string[] = [
  "Авторська кухня",
  "Комфортна посадка",
  "Онлайн-бронювання",
];

export const DEFAULT_GALLERY: readonly string[] = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
];

export const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop";

export const DEFAULT_MENU_HIGHLIGHTS: readonly RestaurantMenuDraft[] = [
  {
    description: "Фірмова страва з акцентом на локальні інгредієнти",
    name: "Фірмова страва",
    price: 420,
  },
  {
    description: "Сезонна пропозиція, яку часто замовляють уперше",
    name: "Сезонний хіт",
    price: 510,
  },
];

export const DEFAULT_REVIEWS: readonly RestaurantReviewDraft[] = [
  {
    author: "Ірина М.",
    rating: 5,
    text: "Атмосфера, сервіс і кухня виглядають як повноцінний ресторанний бренд, а не випадковий заклад.",
  },
  {
    author: "Олег К.",
    rating: 5,
    text: "Зручно забронювати, зрозуміле меню та сильне перше враження ще до візиту.",
  },
];

export const DEFAULT_TABLES: readonly RestaurantTable[] = [
  { name: "Стіл 1", seats: 2 },
  { name: "Стіл 2", seats: 4 },
  { name: "Стіл 3", seats: 4 },
  { name: "Стіл 4", seats: 6 },
];

export const buildDomainSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9а-яіїєґ]/giu, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "");

export const buildWorkHoursLabel = (
  openingTime: string,
  closingTime: string
): string => `Щодня: ${openingTime} - ${closingTime}`;

function createDefaultSocialLinks() {
  return {
    facebook: "",
    instagram: "",
    telegram: "",
  };
}

function cloneTable(table: RestaurantTable): RestaurantTable {
  return { ...table };
}

function normalizeMenuHighlight(
  item: RestaurantMenuDraft
): RestaurantMenuDraft {
  return {
    description: item.description.trim(),
    name: item.name.trim(),
    price: item.price,
  };
}

function hasMenuHighlightContent(item: RestaurantMenuDraft): boolean {
  return item.name.length > 0 || item.description.length > 0 || item.price > 0;
}

function normalizeReview(review: RestaurantReviewDraft): RestaurantReviewDraft {
  return {
    author: review.author.trim(),
    rating: review.rating,
    text: review.text.trim(),
  };
}

function hasReviewContent(review: RestaurantReviewDraft): boolean {
  return (
    review.author.length > 0 || review.text.length > 0 || review.rating !== 5
  );
}

function toMenuHighlightDraft(
  item: Restaurant["menuHighlights"][number]
): RestaurantMenuDraft {
  return {
    description: item.description,
    name: item.name,
    price: item.price,
  };
}

function toReviewDraft(
  review: Restaurant["reviews"][number]
): RestaurantReviewDraft {
  return {
    author: review.author,
    rating: review.rating,
    text: review.text,
  };
}

function toTableDraft(table: Restaurant["tables"][number]): RestaurantTable {
  return {
    id: table.id,
    name: table.name,
    seats: table.seats,
  };
}

export const createRestaurantDraft = (): RestaurantUpsertPayload => ({
  address: "",
  averageDuration: 90,
  closingTime: DEFAULT_CLOSING_TIME,
  cuisine: "",
  description: "",
  domain: "",
  email: "",
  features: [...DEFAULT_FEATURES],
  gallery: [],
  heroImage: DEFAULT_HERO_IMAGE,
  logo: "",
  menuHighlights: [],
  name: "",
  openingTime: DEFAULT_OPENING_TIME,
  phone: "",
  priceRange: "₴₴",
  reviews: [],
  shortDescription: "",
  showGallery: false,
  showMenu: false,
  showReviews: false,
  socialLinks: createDefaultSocialLinks(),
  tables: DEFAULT_TABLES.map(cloneTable),
  workHours: buildWorkHoursLabel(DEFAULT_OPENING_TIME, DEFAULT_CLOSING_TIME),
});

function resolvePatchedDomain(
  current: RestaurantUpsertPayload,
  patch: Partial<RestaurantUpsertPayload>
): string | undefined {
  if (!("name" in patch)) {
    return undefined;
  }

  const previousSlug = buildDomainSlug(current.name);

  if (!patch.domain && (!current.domain || current.domain === previousSlug)) {
    return buildDomainSlug(patch.name ?? "");
  }

  return undefined;
}

function resolvePatchedWorkHours(
  current: RestaurantUpsertPayload,
  patch: Partial<RestaurantUpsertPayload>
): string | undefined {
  if (!("openingTime" in patch) && !("closingTime" in patch)) {
    return undefined;
  }

  const openingTime = patch.openingTime ?? current.openingTime;
  const closingTime = patch.closingTime ?? current.closingTime;
  const automaticWorkHours = buildWorkHoursLabel(
    current.openingTime,
    current.closingTime
  );

  if (
    !patch.workHours &&
    (!current.workHours || current.workHours === automaticWorkHours)
  ) {
    return buildWorkHoursLabel(openingTime, closingTime);
  }

  return undefined;
}

export const applyRestaurantDraftPatch = (
  current: RestaurantUpsertPayload,
  patch: Partial<RestaurantUpsertPayload>
): RestaurantUpsertPayload => {
  const nextDraft = {
    ...current,
    ...patch,
  };
  const nextDomain = resolvePatchedDomain(current, patch);
  const nextWorkHours = resolvePatchedWorkHours(current, patch);

  if (nextDomain) {
    nextDraft.domain = nextDomain;
  }

  if (nextWorkHours) {
    nextDraft.workHours = nextWorkHours;
  }

  return nextDraft;
};

export const normalizeRestaurantUpsertPayload = (
  payload: RestaurantUpsertPayload
): RestaurantUpsertPayload => ({
  ...payload,
  gallery: payload.gallery.map((item) => item.trim()).filter(Boolean),
  menuHighlights: payload.menuHighlights
    .map(normalizeMenuHighlight)
    .filter(hasMenuHighlightContent),
  reviews: payload.reviews.map(normalizeReview).filter(hasReviewContent),
});

export const toRestaurantUpsertPayload = (
  restaurant: Restaurant
): RestaurantUpsertPayload => ({
  address: restaurant.address,
  averageDuration: restaurant.averageDuration,
  closingTime: restaurant.closingTime,
  cuisine: restaurant.cuisine,
  description: restaurant.description,
  domain: restaurant.domain,
  email: restaurant.email ?? "",
  features: [...restaurant.features],
  gallery: [...restaurant.gallery],
  heroImage: restaurant.heroImage ?? "",
  logo: restaurant.logo ?? "",
  menuHighlights: restaurant.menuHighlights.map(toMenuHighlightDraft),
  name: restaurant.name,
  openingTime: restaurant.openingTime,
  phone: restaurant.phone,
  priceRange: restaurant.priceRange,
  reviews: restaurant.reviews.map(toReviewDraft),
  shortDescription: restaurant.shortDescription,
  showGallery: restaurant.showGallery,
  showMenu: restaurant.showMenu,
  showReviews: restaurant.showReviews,
  socialLinks: {
    facebook: restaurant.socialLinks?.facebook ?? "",
    instagram: restaurant.socialLinks?.instagram ?? "",
    telegram: restaurant.socialLinks?.telegram ?? "",
  },
  tables: restaurant.tables.map(toTableDraft),
  workHours: restaurant.workHours,
});
