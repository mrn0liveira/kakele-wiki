import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import {
	apiAuthPrefix,
	authRoutes,
	DEFAULT_LOGIN_REDIRECT,
	publicRoutes,
} from "@/routes";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
	const { nextUrl } = req;

	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = apiAuthPrefix.includes(nextUrl.pathname);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
		return Response.redirect(new URL("/login", nextUrl));
	}

	if (isApiAuthRoute) {
		if (isAuthRoute && isLoggedIn) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}

		return NextResponse.next();
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}

		const requestHeaders = new Headers(req.headers);
		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
	}

	if (!isLoggedIn && !isPublicRoute) {
		let callbackUrl = nextUrl.pathname;

		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return NextResponse.redirect(
			new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
		);
	}

	return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/api/admin"],
};
