export const PROXY_CONFIG = {
  adminSubdomain: process.env.NEXT_PUBLIC_ADMIN_SUBDOMAIN ?? "admin",
  rootDomain: process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "localhost:3000",
} as const;

export function getSubdomain(host: string | null): string | null {
  if (!host) {
    return null;
  }

  if (host === PROXY_CONFIG.rootDomain) {
    return null;
  }

  return host.split(".")[0] ?? null;
}

export function isAdminDomain(host: string | null): boolean {
  return getSubdomain(host) === PROXY_CONFIG.adminSubdomain;
}

export function isTenantDomain(host: string | null): boolean {
  const subdomain = getSubdomain(host);
  return subdomain !== null && subdomain !== PROXY_CONFIG.adminSubdomain;
}

export function getTenantSlug(host: string | null): string | null {
  if (!isTenantDomain(host)) {
    return null;
  }

  return getSubdomain(host);
}
