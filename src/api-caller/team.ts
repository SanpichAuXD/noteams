import { getInstance } from "@/api/apiClient";
import {  formatCookie, formattedError} from "@/lib/utils";
import { SignupRequest } from "@/type/user";
import destr from "destr";
import { TypedFormData } from '@/lib/CustomFormData';
import { CreateTeamRequest, GetTeamsType } from "@/type/team";
import { IFormattedErrorResponse } from "@/type/type";
export async function getTeams(token:string) : Promise<GetTeamsType[]
// | IFormattedErrorResponse
>{
    const cookie = formatCookie(document.cookie)
    const {user_id} = (destr<SignupRequest>(cookie))
    try{

        const {data} = await getInstance().get(`/users/teams/${user_id}`, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        });
        console.log(data,"from api caller")
        return data
    }
    catch(error){
        throw formattedError(error)
    }
}

export async function createTeam({ token, formData }: { token: string; formData: TypedFormData<CreateTeamRequest>; }){
    const cookie = formatCookie(document.cookie)
    const {user_id} = (destr<SignupRequest>(cookie))
    formData.append("owner_id",user_id)
    try{

    const {data} = await getInstance().post(`/teams`,formData,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    return data}
    catch(error){
        throw formattedError(error)
    }
}

export const getTeamById = async (token : string, team_id : string) => {
    try{

    const {data} = await getInstance().get(`/teams/${team_id}`, {
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    return data}
    catch(error){
        throw formattedError(error)
    }

}