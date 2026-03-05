import type { Restaurant } from "./types";

export const MOCK_RESTAURANTS: Record<string, Restaurant> = {
  app: {
    address: "вул. Сковороди, 12, Київ",
    cuisine: "Італійська",
    description:
      "Найкраща італійська кухня у вашому місті. Справжня піца з дров'яної печі та домашня паста. Ми створюємо атмосферу справжньої Італії вже понад 10 років.",
    domain: "app",
    email: "info@gustoitaliano.ua",
    features: ["Wi-Fi", "Тераса", "Парковка"],
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2069&auto=format&fit=crop",
    ],
    id: "1",
    menuHighlights: [
      {
        description: "Томатний соус, моцарела, базилік",
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=400&auto=format&fit=crop",
        name: "Піца Маргарита",
        price: 320,
      },
    ],
    name: "Gusto Italiano (Dev Mode)",
    phone: "+380 44 123 45 67",
    priceRange: "₴₴",
    rating: 4.8,
    reviewCount: 324,
    reviews: [
      {
        author: "Олександр К.",
        date: "15.01.2026",
        id: "1",
        rating: 5,
        text: "Найкраща піца в Києві!",
      },
    ],
    shortDescription: "Справжня італійська кухня з дров'яної печі",
    socialLinks: {
      instagram: "https://instagram.com/gustoitaliano",
    },
    workHours: "Пн-Нд: 10:00 - 22:00",
  },
  steakhouse: {
    address: "пр-т Перемоги, 45, Київ",
    cuisine: "Стейк-хаус",
    description:
      "Мистецтво приготування м'яса. Тільки витримана яловичина та авторські соуси. Наші стейки готують професійні м'ясники з багаторічним досвідом.",
    domain: "steakhouse",
    email: "reservations@primesteakhouse.ua",
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
    id: "2",
    menuHighlights: [
      {
        description: "Витримана яловичина, мармурова, з грибами",
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=400&auto=format&fit=crop",
        name: "Ribeye 500g",
        price: 1250,
      },
      {
        description: "Найніжніша частина яловичини, соус беарнез",
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop",
        name: "Filet Mignon",
        price: 1450,
      },
      {
        description: "Комбінація стріп та філе, 800г",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop",
        name: "T-Bone",
        price: 1680,
      },
      {
        description: "Свіжий лобстер з вершковим маслом",
        image:
          "https://images.unsplash.com/photo-1553247407-23251ce81f59?q=80&w=400&auto=format&fit=crop",
        name: "Лобстер на грилі",
        price: 1890,
      },
    ],
    name: "Prime Steakhouse",
    phone: "+380 44 987 65 43",
    priceRange: "₴₴₴",
    rating: 4.9,
    reviewCount: 512,
    reviews: [
      {
        author: "Дмитро С.",
        date: "20.01.2026",
        id: "1",
        rating: 5,
        text: "Неймовірний стейк! Кращий, що я коли-небудь їв. Винотека вражає вибором. Обов'язково до відвідування!",
      },
      {
        author: "Анна Т.",
        date: "18.01.2026",
        id: "2",
        rating: 5,
        text: "Чудове місце для романтичної вечері. Персонал уважний, атмосфера на висоті. Десерти теж на вищому рівні.",
      },
      {
        author: "Сергій М.",
        date: "12.01.2026",
        id: "3",
        rating: 5,
        text: "Регулярно відвідую, ніколи не розчарують. T-Bone - фірмова страва, рекомендую всім любителям м'яса!",
      },
    ],
    shortDescription: "Преміальні стейки та авторська кухня",
    socialLinks: {
      instagram: "https://instagram.com/primesteakhouse",
      telegram: "https://t.me/primesteakhouse",
    },
    workHours: "Пн-Нд: 12:00 - 23:00",
  },
  "test-restaurant": {
    address: "вул. Сковороди, 12, Київ",
    cuisine: "Італійська",
    description:
      "Найкраща італійська кухня у вашому місті. Справжня піца з дров'яної печі та домашня паста. Ми створюємо атмосферу справжньої Італії вже понад 10 років. Кожна страва готується за традиційними рецептами з любов'ю та найкращих інгредієнтів.",
    domain: "test-restaurant",
    email: "info@gustoitaliano.ua",
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
    id: "1",
    menuHighlights: [
      {
        description: "Томатний соус, моцарела, базилік, оливкова олія",
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=400&auto=format&fit=crop",
        name: "Піца Маргарита",
        price: 320,
      },
      {
        description: "Спагетті, бекон, яйце, пармезан, чорний перець",
        image:
          "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400&auto=format&fit=crop",
        name: "Паста Карбонара",
        price: 380,
      },
      {
        description: "Класичний італійський десерт з маскарпоне",
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=400&auto=format&fit=crop",
        name: "Тірамісу",
        price: 250,
      },
      {
        description: "Свіжий лосось з овочами та лимонним соусом",
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&auto=format&fit=crop",
        name: "Лосось на грилі",
        price: 520,
      },
    ],
    name: "Gusto Italiano",
    phone: "+380 44 123 45 67",
    priceRange: "₴₴",
    rating: 4.8,
    reviewCount: 324,
    reviews: [
      {
        author: "Олександр К.",
        date: "15.01.2026",
        id: "1",
        rating: 5,
        text: "Найкраща піца в Києві! Тісто ідеальне, начинки багато. Обслуговування на висоті. Обов'язково повернемось!",
      },
      {
        author: "Марія П.",
        date: "10.01.2026",
        id: "2",
        rating: 5,
        text: "Чудова атмосфера, привітний персонал. Особливо сподобалася тераса влітку. Рекомендую пасту карбонара!",
      },
      {
        author: "Ігор В.",
        date: "05.01.2026",
        id: "3",
        rating: 4,
        text: "Добрий ресторан, смачна їжа. Трохи довго чекали на столик у вихідний, але того варто. Тірамісу - бомба!",
      },
    ],
    shortDescription: "Справжня італійська кухня з дров'яної печі",
    socialLinks: {
      facebook: "https://facebook.com/gustoitaliano",
      instagram: "https://instagram.com/gustoitaliano",
      telegram: "https://t.me/gustoitaliano",
    },
    workHours: "Пн-Нд: 10:00 - 22:00",
  },
};
