/**
 * Proxy/routing configuration constants.
 * Domain parsing utilities: @/shared/lib/tenant
 */
export const PROXY_CONFIG = {
  adminSubdomain: process.env.NEXT_PUBLIC_ADMIN_SUBDOMAIN ?? "admin",
  rootDomain: process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "localhost:3000",
};

export function getSubdomain(host: string | null): string | null {
  if (!host) {
    return null;
  }
  const root = PROXY_CONFIG.rootDomain;
  if (host === root) {
    return null;
  }
  return host.split(".")[0] ?? null;
}
