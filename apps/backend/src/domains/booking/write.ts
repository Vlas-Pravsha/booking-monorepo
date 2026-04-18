import type { ReservationCreateInput } from "../../contracts/zod/public";
import type { AppPrismaClient } from "../../core/types";

interface CreatePublicBookingInput {
  endAt: Date;
  input: ReservationCreateInput;
  restaurantId: string;
  startAt: Date;
}

const normalizeOptionalString = (value: string | undefined): string | null => {
  const normalizedValue = value?.trim();
  return normalizedValue || null;
};

export const createPublicBookingRecord = (
  prisma: AppPrismaClient,
  { endAt, input, restaurantId, startAt }: CreatePublicBookingInput
) =>
  prisma.$transaction(async (tx) => {
    const phone = normalizeOptionalString(input.phone);
    const email = normalizeOptionalString(input.email)?.toLowerCase() ?? null;
    const customer = await tx.customer.create({
      data: {
        email,
        name: input.name.trim(),
        phone,
        restaurantId,
      },
      select: {
        id: true,
      },
    });

    return tx.booking.create({
      data: {
        customerEmail: email,
        customerId: customer.id,
        customerName: input.name.trim(),
        customerPhone: phone,
        endAt,
        guestCount: input.guests,
        note: input.comment?.trim() ?? "",
        restaurantId,
        source: "website",
        startAt,
        status: "pending",
        tableId: input.tableId,
      },
      select: {
        id: true,
      },
    });
  });
