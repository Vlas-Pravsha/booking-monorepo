import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getSubdomain, PROXY_CONFIG } from "./shared/lib/tenant";

export default function proxy(request: NextRequest) {
  const { nextUrl: url, headers } = request;
  const host = headers.get("host");
  const subdomain = getSubdomain(host);

  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  if (subdomain === PROXY_CONFIG.adminSubdomain) {
    return NextResponse.rewrite(new URL(`/admin${path}`, request.url));
  }

  if (!subdomain) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, request.url));
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
