import { getInstance } from "@/api/apiClient";
import {  formatCookie, formattedError} from "@/lib/utils";
import { SignupRequest } from "@/type/user";
import destr from "destr";
import { TypedFormData } from '@/lib/CustomFormData';
import { CreateTeamRequest, CreateTeamResponse, GetSettingResponse, GetTeamsType, JoinTeamRequest, SettingRequest, TeamData, TeamRequest } from "@/type/team";
import { IFormattedErrorResponse } from "@/type/type";
export async function getTeams(token:string) : Promise<GetTeamsType[]
// | IFormattedErrorResponse
>{
    console.log(document.cookie,"from api caller")
    console.log('running get all team')
    const cookie = formatCookie(document.cookie)
    const {user_id} = (destr<SignupRequest>(cookie))
    console.log(user_id,"from api caller")
    try{
        console.log(user_id,"from api caller")
        const {data} = await getInstance().get(`/users/teams/${user_id}`, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        });
        console.log(data,"from api caller")
        return data
    }
    catch(error){
        console.log(error)
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


export const getmemberByTeamId = async (token : string, team_id : string) => {
    try{

    const {data} = await getInstance().get(`/teams/member/${team_id}`, {
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    return data;
}
catch(error){
    throw formattedError(error)
}
}


export const joinTeams = async (token : string, formData : TypedFormData<JoinTeamRequest>) => {
   try{
        const {data} = await getInstance().post(`/teams/join/`,formData, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        });
        return data
   }catch(error){
       throw formattedError(error)
   }
}
export const inviteMember = async (token : string, team_id : string, email : string[]) => {
    try{

    const {data} = await getInstance().post(`/teams/invite/${team_id}`, {users : email},{
        headers:{ 
            "Authorization" : `Bearer ${token}`
        }})
        return data
    }catch(error){
        throw formattedError(error)
    }
}

export const deleteMember = async (token : string, team_id : string, user_id : string) => {
    try{

    const {data} = await getInstance().delete(`/teams/${team_id}/member/${user_id}`, {
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    return data
}
catch(error){
    throw formattedError(error)
}
}

export const getTeamSetting = async (token : string, team_id : string) : Promise<GetSettingResponse> => {
    try{

    const {data} = await getInstance().get(`/teams/setting/${team_id}`, {
        headers:{
            "Authorization" : `Bearer ${token}`
        }})
        return data;
    }catch(error){
        throw formattedError(error)
    }
}

export const updateTeamSetting = async ({token, team_id,permissionType,value} : TeamRequest & SettingRequest ) => {
    try{

    const {data} = await getInstance().put(`/teams/${team_id}/settings`, {permissionType, value}, {
        headers:{
            "Authorization" : `Bearer ${token}`
        }})
        return data;
    }catch(error){
        throw formattedError(error)
    }
}

export const updateTeamProfile = async ({token,formData,team_id} :  TeamRequest & { formData : FormData}) => {
    
    try{
        const {data} = await getInstance().put(`/teams/profile/${team_id}`, formData, {
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        return data;
}
catch(error){
    throw formattedError(error)
}

}




export const updateCodeTeam = async ({token,team_id, code} : TeamRequest & {code : string}) => {
    try{

    const {data} = await getInstance().put(`/teams/${team_id}/code`, {code}, {
        headers:{
            "Authorization" : `Bearer ${token}`
        }})
        return data;
    }catch(error){
        throw formattedError(error)
    }
}