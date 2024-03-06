import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const tokenId = cookies().get('tokenId');
    const formData = new FormData();
    if(!tokenId?.value) return NextResponse.error();
    formData.append('oauth_id', tokenId?.value.replaceAll("%22", "").replaceAll('"', ""));
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signout`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${cookies().get('accessToken')?.value}`,
        },
        body: formData
    });
    const data = await res.json();
    console.log(data, "signout data")
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
    cookies().delete('user')
    cookies().delete('tokenId')
    if (res.ok){
        return Response.json({message : "Signed out successfully", status: 200});
    }
    else{
        throw new Error("Failed to sign out");
    }
    // return NextResponse.redirect(new URL("/signin", req.url));
}