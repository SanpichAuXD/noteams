import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { refreshToken } from "./api-caller/user";
import { cookies } from "next/headers";
import { isResponseError } from "./lib/utils";
const jwtSecret = new TextEncoder().encode(
	process.env.NEXT_PUBLIC_JWT_SECRET_KEY
);
// // This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse> {
	console.log("middleware");
	const access = request.cookies.get("accessToken");
	const refresh = request.cookies.get("refreshToken");
	const noauthpath = ["/signup", "/signin"];

// 	if (access) {
// 		if (refresh) {
// 			try {
// 				const { payload } = await jwtVerify(access.value, jwtSecret);
// 				const expire = payload.exp;
// 				// will ask for refresh token before 1 hour of expire
// 				if (expire && expire < (Date.now() + 3600000) / 1000) {
// 					console.log("now");
// 					const data = await refreshToken(
// 						access.value,
// 						refresh.value
// 					);
// 					console.log(data, "data");
// 					const response = NextResponse.next();
// 					console.log(data);
// 					if (!isResponseError(data)) {
// 						console.log(data);
// 						response.cookies.set({
// 							name: "accessToken",
// 							value: data.token.access_token,
// 							// keep the cookie for a days
// 							maxAge: 60 * 60 * 24,
// 							// cookie will be accessible by client's JavaScript
// 							httpOnly: true,
// 							// cookie will be sent only over HTTPS
// 							secure: true,
// 						});

// 						return response;
// 					}
// 				}

// 				// return NextResponse.next();
// 			} catch (error: any) {
// 				if (error.name === "JWTExpired") console.log("xd");
// 				const response = NextResponse.redirect(
// 					new URL("/signin", request.url)
// 				);
// 				response.cookies.delete("accessToken");
// 				response.cookies.delete("refreshToken");
// 				response.cookies.delete("user");
// 				response.cookies.delete("tokenId");
// 				return response;
// 			}
// 		}
// 		if (noauthpath.includes(request.nextUrl.pathname)) {
// 			console.log("middleware go to teams");
// 			return NextResponse.redirect(new URL("/teams", request.nextUrl));
// 		}
// 		if (request.nextUrl.pathname === "/signout") {
// 			console.log("middleware go to teams");
// 			const response = NextResponse.next()
// 			response.cookies.delete("accessToken");
// 			response.cookies.delete("refreshToken");
// 			response.cookies.delete("user");
// 			response.cookies.delete("tokenId");
// 			return response;
// 		}
// 	}

// 	console.log(access);
// 	//   console.log(auth, noauthpath.includes(request.nextUrl.pathname), auth && noauthpath.includes(request.nextUrl.pathname));
// 	if (!access && !noauthpath.includes(request.nextUrl.pathname)) {
// 		console.log("middleware go to signin");
// 		return NextResponse.redirect(new URL("/signin", request.nextUrl));
// 	}
// 	console.log("middleware end ");
	return NextResponse.next();
}

// // See "Matching Paths" below to learn more

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
