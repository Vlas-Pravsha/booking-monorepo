-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

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

INSERT INTO "new_Booking" ("createdAt", "customerEmail", "customerId", "customerName", "customerPhone", "endAt", "guestCount", "id", "isSample", "note", "restaurantId", "source", "startAt", "status", "tableId", "totalAmount", "updatedAt")
SELECT "createdAt", "customerEmail", "customerId", "customerName", "customerPhone", "endAt", "guestCount", "id", "isSample", "note", "restaurantId", "source", "startAt", "status", "tableId", "totalAmount", "updatedAt"
FROM "Booking";

DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE INDEX "Booking_restaurantId_startAt_idx" ON "Booking"("restaurantId", "startAt");
CREATE INDEX "Booking_restaurantId_status_idx" ON "Booking"("restaurantId", "status");
CREATE INDEX "Booking_customerId_startAt_idx" ON "Booking"("customerId", "startAt");
CREATE INDEX "Booking_tableId_startAt_idx" ON "Booking"("tableId", "startAt");

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

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_ownerId_key" ON "Restaurant"("ownerId");
