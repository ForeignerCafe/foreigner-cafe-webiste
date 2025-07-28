import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Make sure this stays at the top level (Edge-compatible)
const JWT_SECRET = process.env.JWT_SECRET!;
const encoder = new TextEncoder();

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  let isLoggedIn = false;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));
      isLoggedIn = !!payload;
    } catch (e) {
      isLoggedIn = false;
    }
  }

  const pathname = req.nextUrl.pathname;
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminAPI = pathname.startsWith("/api/admin");

  if ((isAdminPage || isAdminAPI) && !isLoggedIn) {
    if (isAdminAPI) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// ✅ No runtime specified = uses Edge Runtime
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
