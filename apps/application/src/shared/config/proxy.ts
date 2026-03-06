import {
  getSubdomain as getTenantSubdomain,
  PROXY_CONFIG,
} from "../lib/tenant";

export { PROXY_CONFIG };

/**
 * @deprecated Use getSubdomain from "@/shared/lib/tenant" instead.
 */
export const getSubdomain = getTenantSubdomain;
