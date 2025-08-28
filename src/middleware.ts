import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { PUBLIC_GATEWAY_URL } from "./config/app";

async function middleware(request: NextRequestWithAuth) {
  const { pathname } = request.nextUrl;
  request.headers.set("x-pathname", pathname);

  if (pathname.startsWith(PUBLIC_GATEWAY_URL)) {
    request.headers.delete("cookie");

    const token = request.nextauth.token;
    if (token?.accessToken) {
      request.headers.set("Authorization", `Bearer ${token?.accessToken}`);
    }

    return NextResponse.rewrite(
      new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`),
      {
        headers: request.headers,
      }
    );
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
