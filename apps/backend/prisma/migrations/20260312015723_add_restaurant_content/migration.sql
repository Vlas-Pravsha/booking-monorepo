-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT,
    "heroImage" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "workHours" TEXT NOT NULL,
    "openingTime" TEXT NOT NULL,
    "closingTime" TEXT NOT NULL,
    "averageDuration" INTEGER NOT NULL DEFAULT 90,
    "cuisine" TEXT NOT NULL,
    "priceRange" TEXT NOT NULL DEFAULT '₴₴',
    "showMenu" BOOLEAN NOT NULL DEFAULT false,
    "showGallery" BOOLEAN NOT NULL DEFAULT false,
    "showReviews" BOOLEAN NOT NULL DEFAULT false,
    "instagram" TEXT,
    "facebook" TEXT,
    "telegram" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RestaurantFeature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "RestaurantFeature_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RestaurantMenuItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "position" INTEGER NOT NULL,
    CONSTRAINT "RestaurantMenuItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RestaurantReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "avatar" TEXT,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "RestaurantReview_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RestaurantGalleryImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "RestaurantGalleryImage_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RestaurantTable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "RestaurantTable_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_ownerId_key" ON "Restaurant"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_domain_key" ON "Restaurant"("domain");

-- CreateIndex
CREATE INDEX "Restaurant_ownerId_idx" ON "Restaurant"("ownerId");

-- CreateIndex
CREATE INDEX "RestaurantFeature_restaurantId_position_idx" ON "RestaurantFeature"("restaurantId", "position");

-- CreateIndex
CREATE INDEX "RestaurantMenuItem_restaurantId_position_idx" ON "RestaurantMenuItem"("restaurantId", "position");

-- CreateIndex
CREATE INDEX "RestaurantReview_restaurantId_position_idx" ON "RestaurantReview"("restaurantId", "position");

-- CreateIndex
CREATE INDEX "RestaurantGalleryImage_restaurantId_position_idx" ON "RestaurantGalleryImage"("restaurantId", "position");

-- CreateIndex
CREATE INDEX "RestaurantTable_restaurantId_position_idx" ON "RestaurantTable"("restaurantId", "position");
