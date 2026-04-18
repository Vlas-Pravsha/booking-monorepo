import type { PrismaExecutor } from "../../core/types";

interface CreateMarketingContactRequestInput {
  email: string;
  ipAddress: string | null;
  message: string;
  name: string;
  phone: string;
  userAgent: string | null;
}

export const createMarketingContactRequestRecord = (
  prisma: PrismaExecutor,
  input: CreateMarketingContactRequestInput
) =>
  prisma.marketingContactRequest.create({
    data: {
      email: input.email,
      ipAddress: input.ipAddress,
      message: input.message,
      name: input.name,
      phone: input.phone,
      userAgent: input.userAgent,
    },
  });
