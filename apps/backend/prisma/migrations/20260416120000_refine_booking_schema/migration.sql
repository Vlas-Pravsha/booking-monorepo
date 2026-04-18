-- DropIndex
DROP INDEX "RestaurantFeature_restaurantId_position_idx";

-- DropIndex
DROP INDEX "RestaurantMenuItem_restaurantId_position_idx";

-- DropIndex
DROP INDEX "RestaurantReview_restaurantId_position_idx";

-- DropIndex
DROP INDEX "RestaurantGalleryImage_restaurantId_position_idx";

-- DropIndex
DROP INDEX "CustomerTag_customerId_position_idx";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_RestaurantTable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "statusOverride" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RestaurantTable_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "new_RestaurantTable" ("id", "name", "position", "restaurantId", "seats", "statusOverride")
SELECT "id", "name", "position", "restaurantId", "seats", "statusOverride"
FROM "RestaurantTable";

DROP TABLE "RestaurantTable";
ALTER TABLE "new_RestaurantTable" RENAME TO "RestaurantTable";
CREATE UNIQUE INDEX "RestaurantTable_restaurantId_position_key" ON "RestaurantTable"("restaurantId", "position");

CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "notes" TEXT NOT NULL DEFAULT '',
    "vip" BOOLEAN NOT NULL DEFAULT false,
    "isSample" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Customer_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "new_Customer" ("createdAt", "email", "id", "isSample", "name", "notes", "phone", "restaurantId", "updatedAt", "vip")
SELECT "createdAt", "email", "id", "isSample", "name", "notes", "phone", "restaurantId", "updatedAt", "vip"
FROM "Customer";

DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE INDEX "Customer_restaurantId_createdAt_idx" ON "Customer"("restaurantId", "createdAt");
CREATE INDEX "Customer_restaurantId_vip_idx" ON "Customer"("restaurantId", "vip");

CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "customerId" TEXT,
    "tableId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT,
    "customerEmail" TEXT,
    "guestCount" INTEGER NOT NULL,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "source" TEXT NOT NULL DEFAULT 'website',
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "note" TEXT NOT NULL DEFAULT '',
    "isSample" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Booking_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "RestaurantTable" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "new_Booking" ("createdAt", "customerId", "customerName", "customerPhone", "endAt", "guestCount", "id", "isSample", "note", "restaurantId", "source", "startAt", "status", "tableId", "totalAmount", "updatedAt")
SELECT "createdAt", "customerId", "customerName", "customerPhone", "endAt", "guestCount", "id", "isSample", "note", "restaurantId", "source", "startAt", "status", "tableId", "totalAmount", "updatedAt"
FROM "Booking";

DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE INDEX "Booking_restaurantId_startAt_idx" ON "Booking"("restaurantId", "startAt");
CREATE INDEX "Booking_restaurantId_status_idx" ON "Booking"("restaurantId", "status");
CREATE INDEX "Booking_customerId_startAt_idx" ON "Booking"("customerId", "startAt");
CREATE INDEX "Booking_tableId_startAt_idx" ON "Booking"("tableId", "startAt");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantFeature_restaurantId_position_key" ON "RestaurantFeature"("restaurantId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantMenuItem_restaurantId_position_key" ON "RestaurantMenuItem"("restaurantId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantReview_restaurantId_position_key" ON "RestaurantReview"("restaurantId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantGalleryImage_restaurantId_position_key" ON "RestaurantGalleryImage"("restaurantId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerTag_customerId_position_key" ON "CustomerTag"("customerId", "position");
