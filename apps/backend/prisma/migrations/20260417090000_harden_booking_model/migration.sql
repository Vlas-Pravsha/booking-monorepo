-- AlterTable
ALTER TABLE "Customer" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN "deletedAt" DATETIME;

-- DropIndex
DROP INDEX "Restaurant_ownerId_key";

-- CreateIndex
CREATE INDEX "Customer_restaurantId_deletedAt_createdAt_idx" ON "Customer"("restaurantId", "deletedAt", "createdAt");

-- CreateIndex
CREATE INDEX "Customer_restaurantId_deletedAt_vip_idx" ON "Customer"("restaurantId", "deletedAt", "vip");

-- CreateIndex
CREATE INDEX "Booking_restaurantId_deletedAt_startAt_idx" ON "Booking"("restaurantId", "deletedAt", "startAt");

-- CreateIndex
CREATE INDEX "Booking_restaurantId_deletedAt_status_idx" ON "Booking"("restaurantId", "deletedAt", "status");

-- CreateIndex
CREATE INDEX "Booking_tableId_deletedAt_startAt_idx" ON "Booking"("tableId", "deletedAt", "startAt");
