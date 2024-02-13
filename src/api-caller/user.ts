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
	header: string
): Promise<SignInResponse | IFormattedErrorResponse> {
	console.log("refresh");
	try {
		const { data, status, statusText } = await getInstance().post(
			"/users/refresh",
			{ withCredentials: true }
		);
		return data;
	} catch (error) {
		return formattedError(error);
	}
}
