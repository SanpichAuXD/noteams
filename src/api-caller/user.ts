import { getInstance } from "@/api/apiClient";
import { TypedFormData } from "@/lib/CustomFormData";
import { formattedError } from "@/lib/utils";
import { SignupRequest, SignupResponse } from "@/type/user";

// Mock
export default async function signUp(formdata: TypedFormData<SignupRequest>): Promise<SignupResponse> {
  try {
    const { data } = await getInstance().post("/users/signup", formdata);
    return data as SignupResponse;
  } catch (error) {
    throw formattedError(error);
  }
}