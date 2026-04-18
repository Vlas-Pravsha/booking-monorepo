import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { PrismaClient } from "../src/generated/prisma/client.js";
import { hashPassword } from "../src/lib/auth/password";
import { env } from "../src/lib/env";

const seedOwnerEmail = "owner@booking.local";
const seedRestaurantDomain = "demo-restaurant";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3(
    { url: env.DATABASE_URL },
    { timestampFormat: "unixepoch-ms" }
  ),
});

const seed = async (): Promise<void> => {
  const passwordHash = await hashPassword("demo-password-123");

  const owner = await prisma.user.upsert({
    create: {
      email: seedOwnerEmail,
      firstName: "Demo",
      lastLoginAt: new Date(),
      lastName: "Owner",
      passwordHash,
      status: "ACTIVE",
    },
    update: {
      firstName: "Demo",
      lastName: "Owner",
      passwordHash,
      status: "ACTIVE",
    },
    where: {
      email: seedOwnerEmail,
    },
  });

  await prisma.restaurant.upsert({
    create: {
      address: "Kyiv, Sample Street 12",
      averageDuration: 90,
      closingTime: "22:00",
      cuisine: "Modern European",
      description:
        "A seeded restaurant profile for local development and Prisma Studio checks.",
      domain: seedRestaurantDomain,
      email: "hello@demo-restaurant.local",
      facebook: "https://facebook.com/demo.restaurant",
      heroImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
      instagram: "https://instagram.com/demo.restaurant",
      logo: null,
      name: "Demo Restaurant",
      openingTime: "10:00",
      ownerId: owner.id,
      phone: "+380441234567",
      priceRange: "₴₴₴",
      shortDescription: "A polished demo venue for local development.",
      showGallery: true,
      showMenu: true,
      showReviews: true,
      telegram: "https://t.me/demo_restaurant",
      workHours: "Daily 10:00-22:00",
    },
    update: {
      address: "Kyiv, Sample Street 12",
      averageDuration: 90,
      closingTime: "22:00",
      cuisine: "Modern European",
      description:
        "A seeded restaurant profile for local development and Prisma Studio checks.",
      domain: seedRestaurantDomain,
      email: "hello@demo-restaurant.local",
      facebook: "https://facebook.com/demo.restaurant",
      heroImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
      instagram: "https://instagram.com/demo.restaurant",
      logo: null,
      name: "Demo Restaurant",
      openingTime: "10:00",
      phone: "+380441234567",
      priceRange: "₴₴₴",
      shortDescription: "A polished demo venue for local development.",
      showGallery: true,
      showMenu: true,
      showReviews: true,
      telegram: "https://t.me/demo_restaurant",
      workHours: "Daily 10:00-22:00",
    },
    where: {
      ownerId: owner.id,
    },
  });
};

try {
  await seed();
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
