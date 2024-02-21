import { getInstance } from "@/api/apiClient";
import { TypedFormData } from "@/lib/CustomFormData";
import { formattedError } from "@/lib/utils";
import { IFormattedErrorResponse } from "@/type/type";
import {
	SignInRequest,
	SignInResponse,
	SignupRequest,
	SignupResponse,
} from "@/type/user";

// Mock
export default async function signUp(
	formdata: TypedFormData<SignupRequest>
): Promise<SignupResponse | IFormattedErrorResponse> {
	try {
		const { data } = await getInstance().post("/users/signup", formdata);
		return data;
	} catch (error) {
		throw formattedError(error);
	}
}

export async function signIn(
	formdata: TypedFormData<SignInRequest>
): Promise<SignInResponse | IFormattedErrorResponse> {
	try {
		const { data } = await getInstance().post("/users/signin", formdata);
		return data;
	} catch (error) {
		return formattedError(error);
	}
}

export async function signOut(): Promise<string | IFormattedErrorResponse> {
	try {
		const { data } = await getInstance().post("/users/signout");
		return data;
	} catch (error) {
		return formattedError(error);
	}
}

export async function getUser(
	id: string
): Promise<string | IFormattedErrorResponse> {
	try {
		const { data } = await getInstance().get(`/users/${id}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		return formattedError(error);
	}
}

export async function refreshToken(
	header: string,
	refresh: string
): Promise<SignInResponse | IFormattedErrorResponse> {
	console.log("refresh");
	const formData = new FormData();
	formData.append("refresh_token", refresh);
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/users/refresh`,
			{
				method: "POST",
				headers: {
					Authorization: header,
				},
				body: formData,
			}
		)
		const data = await response.json();
		// getInstance().post(
		// 	"/users/refresh",
		// 	{
		// 		headers:{
		// 			Authorization: header
		// 		},
		// 		body: JSON.stringify({ refresh_token: refresh }),
		// 	},
		// 	{ withCredentials: true }
		// );
		console.log(data, 'from api caller')
		return data;
	} catch (error) {
		return formattedError(error);
	}
}
