import type {
  MenuItem,
  Restaurant,
  RestaurantReview,
  RestaurantTable,
  RestaurantUpsertPayload,
} from "./types";

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

export const DEFAULT_MENU_HIGHLIGHTS: readonly MenuItem[] = [
  {
    description: "Фірмова страва з акцентом на локальні інгредієнти",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    name: "Signature dish",
    price: 420,
  },
  {
    description: "Сезонна пропозиція, яку часто замовляють уперше",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
    name: "Chef special",
    price: 510,
  },
];

export const DEFAULT_REVIEWS: readonly Omit<RestaurantReview, "id">[] = [
  {
    author: "Ірина М.",
    date: "12.03.2026",
    rating: 5,
    text: "Атмосфера, сервіс і кухня виглядають як повноцінний ресторанний бренд, а не випадковий заклад.",
  },
  {
    author: "Олег К.",
    date: "09.03.2026",
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

export const createRestaurantDraft = (): RestaurantUpsertPayload => ({
  address: "",
  averageDuration: 90,
  closingTime: "22:00",
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
  openingTime: "10:00",
  phone: "",
  priceRange: "₴₴",
  reviews: [],
  shortDescription: "",
  showGallery: false,
  showMenu: false,
  showReviews: false,
  socialLinks: {
    facebook: "",
    instagram: "",
    telegram: "",
  },
  tables: DEFAULT_TABLES.map((table) => ({ ...table })),
  workHours: buildWorkHoursLabel("10:00", "22:00"),
});

const resolvePatchedDomain = (
  current: RestaurantUpsertPayload,
  patch: Partial<RestaurantUpsertPayload>
): string | undefined => {
  if (!("name" in patch)) {
    return undefined;
  }

  const previousSlug = buildDomainSlug(current.name);

  if (!patch.domain && (!current.domain || current.domain === previousSlug)) {
    return buildDomainSlug(patch.name ?? "");
  }

  return undefined;
};

const resolvePatchedWorkHours = (
  current: RestaurantUpsertPayload,
  patch: Partial<RestaurantUpsertPayload>
): string | undefined => {
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
};

export const applyRestaurantDraftPatch = (
  current: RestaurantUpsertPayload,
  patch: Partial<RestaurantUpsertPayload>
): RestaurantUpsertPayload => {
  const next = {
    ...current,
    ...patch,
  };
  const nextDomain = resolvePatchedDomain(current, patch);
  const nextWorkHours = resolvePatchedWorkHours(current, patch);

  if (nextDomain) {
    next.domain = nextDomain;
  }

  if (nextWorkHours) {
    next.workHours = nextWorkHours;
  }

  return next;
};

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
  menuHighlights: restaurant.menuHighlights.map((item) => ({ ...item })),
  name: restaurant.name,
  openingTime: restaurant.openingTime,
  phone: restaurant.phone,
  priceRange: restaurant.priceRange,
  reviews: restaurant.reviews.map(({ id: _id, ...review }) => ({ ...review })),
  shortDescription: restaurant.shortDescription,
  showGallery: restaurant.showGallery,
  showMenu: restaurant.showMenu,
  showReviews: restaurant.showReviews,
  socialLinks: {
    facebook: restaurant.socialLinks?.facebook ?? "",
    instagram: restaurant.socialLinks?.instagram ?? "",
    telegram: restaurant.socialLinks?.telegram ?? "",
  },
  tables: restaurant.tables.map((table) => ({
    id: table.id,
    name: table.name,
    seats: table.seats,
  })),
  workHours: restaurant.workHours,
});
