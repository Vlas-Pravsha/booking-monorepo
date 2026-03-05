# Tenant Isolation Guide

This guide defines the architectural patterns for **Multi-Tenancy** and **Tenant Isolation** in the **table-reserve.com** Smart Booking System.

## 📐 General Principles

1.  **Domain-Based Routing**: Next.js `[domain]` dynamic routes are used to isolate tenant-specific content.
2.  **Strict Data Isolation**: No tenant data should ever be accessible from another tenant's domain. The external API must enforce this.
3.  **Tenant Context**: Provide a shared `TenantContext` for UI components within the `[domain]` route group.
4.  **Security**: Ensure tenant identification is verified by the backend API via headers or domain-aware endpoints.
5.  **Branding**: Tenant-specific themes/branding are applied based on the current domain.

## 🏗️ Technical Implementation

### Domain Routing (Next.js App Router)

We use `src/app/[domain]/` to capture the current tenant's domain (e.g., `rest1.table-reserve.com`). Initial tenant data can be fetched via Server Components using the shared API client (Server-side fetch), but NOT direct DB access.

```tsx
// src/app/[domain]/page.tsx
import { api } from "@/shared/api";

export default async function TenantHome({
  params,
}: {
  params: { domain: string };
}) {
  const { domain } = await params;

  // Fetch tenant info from the external API by domain
  const tenant = await api.tenants.getByDomain(domain);

  if (!tenant) {
    notFound();
  }

  return <TenantLandingPage tenant={tenant} />;
}
```

### Tenant Identification

The `domain` parameter from the URL is used as the primary identifier:

- **Marketing**: `table-reserve.com`
- **Admin**: `app.table-reserve.com`
- **Tenant**: `[restaurant].table-reserve.com`

### Data Isolation (API Layer)

The external API must filter all queries by the `tenantId` or `domain`. The client-side TanStack Query hooks should automatically include the current tenant context if necessary.

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api } from "@/shared/api";

export function useTenantBookings() {
  const { domain } = useParams();

  return useQuery({
    queryKey: ["bookings", domain],
    queryFn: () => api.bookings.getAllByDomain(domain),
    enabled: !!domain,
  });
}
```

### Middleware

Use Next.js middleware to:

- Verify tenant existence via a quick API check.
- Rewrite URLs if needed for multi-tenancy.
- Handle subdomains vs. custom domains.

## 📁 Organization

- **Domain Route**: `src/app/[domain]/`.
- **Tenant Entity**: `src/entities/tenant/`.
- **Tenant Logic**: `src/shared/lib/tenant/` (utils for domain parsing).

## 🚨 Guidelines for Agent Developers

- **Don't Leak IDs**: Avoid exposing internal `tenantId` in URLs; use `domain` or `slug`.
- **Verify Everything**: The backend is responsible for enforcing isolation, but the client must pass the correct tenant identifier.
- **Isolate Assets**: Ensure tenant-specific assets (logos, images) are fetched from tenant-aware paths.
- **Ukrainian Support**: Ensure tenant-specific strings are correctly handled in Ukrainian.

## 🧪 Verification Checklist

- [ ] Does `[domain]` routing correctly identify the tenant?
- [ ] Are API requests passing the correct tenant context (domain/ID)?
- [ ] Is there a `404` for non-existent domains?
- [ ] Does the admin dashboard isolate data for the current restaurant?
- [ ] Are tenant-specific themes applied correctly?
