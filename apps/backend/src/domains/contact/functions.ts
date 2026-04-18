import { formatISO } from "date-fns";

import type { ContactRequestInput } from "../../contracts/zod/public";
import type { PrismaExecutor } from "../../core/types";
import type { RequestMeta } from "../../lib/http/request-meta";
import { createMarketingContactRequestRecord } from "./write";

export const createMarketingContactRequest = async (
  prisma: PrismaExecutor,
  input: ContactRequestInput,
  meta: RequestMeta
) => {
  const contactRequest = await createMarketingContactRequestRecord(prisma, {
    email: input.email.trim().toLowerCase(),
    ipAddress: meta.ipAddress,
    message: input.message.trim(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    userAgent: meta.userAgent,
  });

  return {
    submittedAt: formatISO(contactRequest.createdAt),
    success: true as const,
  };
};
