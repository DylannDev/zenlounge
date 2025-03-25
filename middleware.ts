import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken")?.value;
  const protectedRoutes = ["/prestations", "/profil"];

  if (!authToken && protectedRoutes.includes(req.nextUrl.pathname)) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url, 308); // ✅ Redirection permanente (308)
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/prestations", "/profil"], // ✅ Applique le middleware sur ces routes
};
