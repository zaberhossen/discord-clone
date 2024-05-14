// import { authMiddleware } from "@clerk/nextjs";

import { NextRequest } from "next/server";

// export default authMiddleware({
//   publicRoutes: ["/api/uploadthing"]
// });

export function middleware(request: NextRequest) {
  return;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
