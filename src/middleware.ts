import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { routing } from "./routing";
import createMiddleware from "next-intl/middleware";

function isPublicPath(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/api/auth")
  );
}
const intlMiddleware = createMiddleware(routing);

async function middleware(request: NextRequestWithAuth) {
  const { pathname } = request.nextUrl;
  request.headers.set("x-pathname", pathname);
  const response = intlMiddleware(request);

  // Skip auth protection on public routes
  if (isPublicPath(request.nextUrl.pathname)) {
    return response;
  }

  console.log("pathname", pathname);
  console.log(
    "pathname starts with",
    pathname.startsWith(process.env.NEXT_PUBLIC_API_URL ?? "")
  );
  if (pathname.startsWith(process.env.NEXT_PUBLIC_API_URL ?? "")) {
    console.log(
      "pathname starts with",
      pathname.startsWith(process.env.NEXT_PUBLIC_API_URL ?? "")
    );
    request.headers.delete("cookie");

    const token = request.nextauth.token;
    if (token?.accessToken) {
      request.headers.set("Authorization", `Bearer ${token?.accessToken}`);
    }
  }

  return NextResponse.next();
}

const withAuthMiddleware = withAuth(middleware, {
  callbacks: {
    authorized: ({ req, token }) => {
      return true;
    },
  },
});

export default withAuthMiddleware;

export const config = {
  matcher: [
    /**
     * It matches all paths except:
     * 1. /api/ (includes trpc there)
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (OG tags proxying)
     * 4. /_vercel (Vercel internals)
     * 5. /_static (inside of /public)
     * 6. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     * 7. The paths containing a file extension (e.g., .jpg, .png, etc.)
     */
    "/((?!api/|_next/|_proxy/|_vercel|_static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
