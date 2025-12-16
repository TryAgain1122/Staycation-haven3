import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role as string;

    console.log("Middleware checking: ", path);
    console.log("User role: ", role);

    // Admin area protection
    if (path.startsWith("/admin")) {
      // If accessing admin login page
      if (path === "/admin/login") {
        if (token?.role) {
          const roleRoutes = {
            Owner: "/admin/owners",
            Csr: "/admin/csr",
            Cleaner: "/admin/cleaners",
            Partner: "/admin/partners",
          };

          const correctRoute = roleRoutes[role as keyof typeof roleRoutes];
          if (correctRoute) {
            console.log(`Already logged in, redirecting to ${correctRoute}`);
            return NextResponse.redirect(new URL(correctRoute, req.url));
          }
        }
        return NextResponse.next();
      }

      // If accessing other admin pages, must have admin role
      const adminRoles = ["Owner", "Csr", "Cleaner", "Partner"];

      if (!role || !adminRoles.includes(role)) {
        console.log(`❌ No admin role detected, redirecting to admin login`);
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      // Role-based routing within admin area
      const roleRoutes = {
        Owner: "/admin/owners",
        Csr: "/admin/csr",
        Cleaner: "/admin/cleaners",
        Partner: "/admin/partners",
      };

      const correctRoute = roleRoutes[role as keyof typeof roleRoutes];

      if (correctRoute && !path.startsWith(correctRoute)) {
        console.log(`Redirecting ${role} from ${path} to ${correctRoute}`);
        return NextResponse.redirect(new URL(correctRoute, req.url));
      }
    }

    // User area protection - prevent admin sessions from accessing user pages
    if (!path.startsWith("/admin")) {
      const adminRoles = ["Owner", "Csr", "Cleaner", "Partner"];

      if (role && adminRoles.includes(role)) {
        console.log(`❌ Admin trying to access user area, auto-logout and redirect to /login`);
        // Clear session and redirect to login
        return NextResponse.redirect(new URL("/api/auth/signout?callbackUrl=/login", req.url));
      }
    }

    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        if (path === "/admin/login") {
          return true;
        }

        // For admin routes, require token
        if (path.startsWith("/admin")) {
          console.log("Checking authorization, token exists:", !!token);
          return !!token;
        }

        // For non-admin routes, allow access
        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/",
    "/rooms/:path*",
    "/bookings/:path*",
  ],
};
