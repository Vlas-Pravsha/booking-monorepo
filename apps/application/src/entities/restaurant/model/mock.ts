import type { Restaurant } from "./types";

export const MOCK_RESTAURANTS: Record<string, Restaurant> = {
  app: {
    id: "1",
    name: "Gusto Italiano (Dev Mode)",
    domain: "app",
    description:
      "Найкраща італійська кухня у вашому місті. Справжня піца з дров'яної печі та домашня паста. Ми створюємо атмосферу справжньої Італії вже понад 10 років.",
    shortDescription: "Справжня італійська кухня з дров'яної печі",
    address: "вул. Сковороди, 12, Київ",
    phone: "+380 44 123 45 67",
    email: "info@gustoitaliano.ua",
    workHours: "Пн-Нд: 10:00 - 22:00",
    rating: 4.8,
    reviewCount: 324,
    cuisine: "Італійська",
    priceRange: "₴₴",
    features: ["Wi-Fi", "Тераса", "Парковка"],
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2069&auto=format&fit=crop",
    ],
    menuHighlights: [
      {
        name: "Піца Маргарита",
        description: "Томатний соус, моцарела, базилік",
        price: 320,
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=400&auto=format&fit=crop",
      },
    ],
    reviews: [
      {
        id: "1",
        author: "Олександр К.",
        rating: 5,
        text: "Найкраща піца в Києві!",
        date: "15.01.2026",
      },
    ],
    socialLinks: {
      instagram: "https://instagram.com/gustoitaliano",
    },
  },
  steakhouse: {
    id: "2",
    name: "Prime Steakhouse",
    domain: "steakhouse",
    description:
      "Мистецтво приготування м'яса. Тільки витримана яловичина та авторські соуси. Наші стейки готують професійні м'ясники з багаторічним досвідом.",
    shortDescription: "Преміальні стейки та авторська кухня",
    address: "пр-т Перемоги, 45, Київ",
    phone: "+380 44 987 65 43",
    email: "reservations@primesteakhouse.ua",
    workHours: "Пн-Нд: 12:00 - 23:00",
    rating: 4.9,
    reviewCount: 512,
    cuisine: "Стейк-хаус",
    priceRange: "₴₴₴",
    features: [
      "Власна винотека",
      "VIP-зали",
      "Парковка",
      "Кальян",
      "Жива музика",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2065&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515669097368-22e68427d2e7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?q=80&w=2070&auto=format&fit=crop",
    ],
    menuHighlights: [
      {
        name: "Ribeye 500g",
        description: "Витримана яловичина, мармурова, з грибами",
        price: 1250,
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Filet Mignon",
        description: "Найніжніша частина яловичини, соус беарнез",
        price: 1450,
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "T-Bone",
        description: "Комбінація стріп та філе, 800г",
        price: 1680,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Лобстер на грилі",
        description: "Свіжий лобстер з вершковим маслом",
        price: 1890,
        image:
          "https://images.unsplash.com/photo-1553247407-23251ce81f59?q=80&w=400&auto=format&fit=crop",
      },
    ],
    reviews: [
      {
        id: "1",
        author: "Дмитро С.",
        rating: 5,
        text: "Неймовірний стейк! Кращий, що я коли-небудь їв. Винотека вражає вибором. Обов'язково до відвідування!",
        date: "20.01.2026",
      },
      {
        id: "2",
        author: "Анна Т.",
        rating: 5,
        text: "Чудове місце для романтичної вечері. Персонал уважний, атмосфера на висоті. Десерти теж на вищому рівні.",
        date: "18.01.2026",
      },
      {
        id: "3",
        author: "Сергій М.",
        rating: 5,
        text: "Регулярно відвідую, ніколи не розчарують. T-Bone - фірмова страва, рекомендую всім любителям м'яса!",
        date: "12.01.2026",
      },
    ],
    socialLinks: {
      instagram: "https://instagram.com/primesteakhouse",
      telegram: "https://t.me/primesteakhouse",
    },
  },
  "test-restaurant": {
    id: "1",
    name: "Gusto Italiano",
    domain: "test-restaurant",
    description:
      "Найкраща італійська кухня у вашому місті. Справжня піца з дров'яної печі та домашня паста. Ми створюємо атмосферу справжньої Італії вже понад 10 років. Кожна страва готується за традиційними рецептами з любов'ю та найкращих інгредієнтів.",
    shortDescription: "Справжня італійська кухня з дров'яної печі",
    address: "вул. Сковороди, 12, Київ",
    phone: "+380 44 123 45 67",
    email: "info@gustoitaliano.ua",
    workHours: "Пн-Нд: 10:00 - 22:00",
    rating: 4.8,
    reviewCount: 324,
    cuisine: "Італійська",
    priceRange: "₴₴",
    features: [
      "Wi-Fi",
      "Дитяча кімната",
      "Тераса",
      "Жива музика",
      "VIP-зал",
      "Парковка",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2069&auto=format&fit=crop",
    ],
    menuHighlights: [
      {
        name: "Піца Маргарита",
        description: "Томатний соус, моцарела, базилік, оливкова олія",
        price: 320,
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Паста Карбонара",
        description: "Спагетті, бекон, яйце, пармезан, чорний перець",
        price: 380,
        image:
          "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Тірамісу",
        description: "Класичний італійський десерт з маскарпоне",
        price: 250,
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Лосось на грилі",
        description: "Свіжий лосось з овочами та лимонним соусом",
        price: 520,
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&auto=format&fit=crop",
      },
    ],
    reviews: [
      {
        id: "1",
        author: "Олександр К.",
        rating: 5,
        text: "Найкраща піца в Києві! Тісто ідеальне, начинки багато. Обслуговування на висоті. Обов'язково повернемось!",
        date: "15.01.2026",
      },
      {
        id: "2",
        author: "Марія П.",
        rating: 5,
        text: "Чудова атмосфера, привітний персонал. Особливо сподобалася тераса влітку. Рекомендую пасту карбонара!",
        date: "10.01.2026",
      },
      {
        id: "3",
        author: "Ігор В.",
        rating: 4,
        text: "Добрий ресторан, смачна їжа. Трохи довго чекали на столик у вихідний, але того варто. Тірамісу - бомба!",
        date: "05.01.2026",
      },
    ],
    socialLinks: {
      instagram: "https://instagram.com/gustoitaliano",
      facebook: "https://facebook.com/gustoitaliano",
      telegram: "https://t.me/gustoitaliano",
    },
  },
};
