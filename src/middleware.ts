import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { refreshToken } from "./api-caller/user";
import { cookies } from "next/headers";
import { deleteCookie } from "./app/action";
// const jwtSecret = new TextEncoder().encode(
// 	process.env.NEXT_PUBLIC_JWT_SECRET_KEY
// );
// // This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse> {
// 	console.log("middleware");
// 	const access = request.cookies.get("accessToken");
// 	const refresh = request.cookies.get("refreshToken")
// 	if (access && refresh) {
// 		try {
// 			const {payload} = await jwtVerify(access.value, jwtSecret);
// 			console.log(payload)
// 			const expire = payload.exp
// 			console.log(expire, Date.now() / 1000)
// 			if (expire && expire < Date.now() - 600000 / 1000){
// 				console.log('exp', access.value)
// 				const response = await refreshToken(refresh.value);
// 				// 
// 			}
// 			return NextResponse.next();
// 		} catch (error: any) {
// 			if (error.name === "JWTExpired")	
// 				console.log('xd')
// 				 const response = NextResponse.redirect(new URL("/signin", request.url));
// 				 response.cookies.delete("accessToken");	
// 				 response.cookies.delete("refreshToken");
// 				return response;
// 			}
				
// 		}
	
// 	console.log(access);
// 	const noauthpath = ["/signup", "/signin"];
	const response = NextResponse.next();
// 	//   console.log(auth, noauthpath.includes(request.nextUrl.pathname), auth && noauthpath.includes(request.nextUrl.pathname));
// 	if (access && noauthpath.includes(request.nextUrl.pathname)) {
// 		return NextResponse.redirect(new URL("/teams", request.url));
// 	} else if (!access && !noauthpath.includes(request.nextUrl.pathname)) {
// 		return NextResponse.redirect(new URL("/signin", request.url));
// 	}

	return response;
}

// // See "Matching Paths" below to learn more

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
