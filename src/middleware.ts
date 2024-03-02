import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { refreshToken, signOut } from "./api-caller/user";
import { cookies } from "next/headers";
import { isResponseError } from "./lib/utils";
const jwtSecret = new TextEncoder().encode(
	process.env.NEXT_PUBLIC_JWT_SECRET_KEY
);
// // This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse> {
	const access = request.cookies.get("accessToken");
	const refresh = request.cookies.get("refreshToken");
	const noauthpath = ["/signup", "/signin"];

	if (refresh) {
		if (access) {
			try {
				const { payload } = await jwtVerify(access.value, jwtSecret);
				const expire = payload.exp;
				// will ask for refresh token before 1 hour of expire
				if (expire && expire < (Date.now() + 180000) / 1000) {
					console.log("now");
					const data = await refreshToken(
						access.value,
						refresh.value
					);
					console.log(data, "data");
					const response = NextResponse.next();
					console.log(data);
					if (!isResponseError(data)) {
						console.log(data);
						response.cookies.set({
							name: "accessToken",
							value: data.token.access_token,
							// keep the cookie for a days
							maxAge: 60 * 60 * 24,
							// cookie will be accessible by client's JavaScript
							httpOnly: true,
							// cookie will be sent only over HTTPS
							secure: true,
						});
						response.cookies.set({
							name: "refreshToken",
							value: data.token.refresh_token,
							// keep the cookie for a days
							maxAge: 60 * 60 * 7,
							// cookie will be accessible by client's JavaScript
							httpOnly: true,
							// cookie will be sent only over HTTPS
							secure: true,
						})
						response.cookies.set({
							name: "user",
							value: JSON.stringify(data.user),
							// keep the cookie for a days
							maxAge: 60 * 60 * 24,
							// cookie will be accessible by client's JavaScript
							
						})
						response.cookies.set({
							name: "tokenId",
							value: data.token.oauth_id,
							// keep the cookie for a days
							maxAge: 60 * 60 * 24,
							// cookie will be accessible by client's JavaScript
							
						})

						return response;
					}
				}

				// return NextResponse.next();
			} catch (error: any) {
				if (error.name === "JWTExpired") console.log("xd");
				
				const response = NextResponse.redirect(
					new URL("/signin", request.url)
				);
				response.cookies.delete("accessToken");
				response.cookies.delete("refreshToken");
				response.cookies.delete("user");
				response.cookies.delete("tokenId");
				return response;
			}
		}
		else if (!access){
			const response = NextResponse.redirect(new URL("/signin", request.url));
			response.cookies.delete("refreshToken");
			console.log('should redirect')
			return response;
		}
		// if (noauthpath.includes(request.nextUrl.pathname)) {
		// 	console.log("middleware go to teams");
		// 	return NextResponse.redirect(new URL("/teams", request.nextUrl));
		// }
		// if (request.nextUrl.pathname === "/signout") {
		// 	console.log("middleware go to teams");
		// 	const signout = await fetch('api/signout')
		// 	// console.log(request.cookies.getAll(), 'signout');
		// 	console.log(signout)
		// 	const response = NextResponse.next();
		// 	response.cookies.delete("accessToken");
		// 	response.cookies.delete("refreshToken");
		// 	response.cookies.delete("user");
		// 	response.cookies.delete("tokenId");
		// 	return response;
		// }
	}

	// 	console.log(access);
	// 	//   console.log(auth, noauthpath.includes(request.nextUrl.pathname), auth && noauthpath.includes(request.nextUrl.pathname));
	// if (!access && !noauthpath.includes(request.nextUrl.pathname)) {
	// 	// console.log("middleware go to signin");
	// 	return NextResponse.redirect(new URL("/signin", request.nextUrl));
	// }
	// if(access && noauthpath.includes(request.nextUrl.pathname)){
	// 	return NextResponse.redirect(new URL("/teams", request.nextUrl));
	// }
	// console.log("middleware end ");
	return NextResponse.next();
}

// // See "Matching Paths" below to learn more

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
