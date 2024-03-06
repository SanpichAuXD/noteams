import { JwtPayload } from "@/type/user";

function base64UrlDecode(base64Url: string): string {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
}

export function decodeJwtToken(token: string): JwtPayload | null {
    try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = base64UrlDecode(payloadBase64);
        return JSON.parse(payloadJson);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}