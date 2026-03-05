const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "localhost:3000";
const ADMIN_SUBDOMAIN = process.env.NEXT_PUBLIC_ADMIN_SUBDOMAIN ?? "admin";

export function getSubdomain(host: string | null): string | null {
  if (!host) {
    return null;
  }
  if (host === ROOT_DOMAIN) {
    return null;
  }

  const parts = host.split(".");
  if (parts.length < 2) {
    return null;
  }

  return parts[0] ?? null;
}

export function isAdminDomain(host: string | null): boolean {
  return getSubdomain(host) === ADMIN_SUBDOMAIN;
}

export function isTenantDomain(host: string | null): boolean {
  const subdomain = getSubdomain(host);
  return subdomain !== null && subdomain !== ADMIN_SUBDOMAIN;
}

export function getTenantSlug(host: string | null): string | null {
  if (!isTenantDomain(host)) {
    return null;
  }
  return getSubdomain(host);
}
