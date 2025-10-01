import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/api/auth"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    for (const publicPath of PUBLIC_PATHS) {
        if (pathname.startsWith(publicPath)) {
            return NextResponse.next();
        }
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/tasks/:path*",
        "/user/:path*",
        "/api/task/:path*",
        "/api/user/:path*",
    ],
};
