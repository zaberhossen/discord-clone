// import { authMiddleware } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

// export default authMiddleware({
//   publicRoutes: ["/api/uploadthing"]
// });

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
