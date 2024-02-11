import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest): NextResponse {
	console.log("middleware");
  const auth = request.cookies.get("accesstoken");
  const noauthpath = ["/signup", "/signin"];
	const response = NextResponse.next();
//   console.log(auth, noauthpath.includes(request.nextUrl.pathname), auth && noauthpath.includes(request.nextUrl.pathname));
	if (
		auth &&
    noauthpath.includes(request.nextUrl.pathname)
	) {
		return NextResponse.redirect(new URL("/teams", request.url));
	}
	else if (!auth && !noauthpath.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}
	return response;
}

// See "Matching Paths" below to learn more

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
