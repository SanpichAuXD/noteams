import { getInstance } from "@/api/apiClient";
import {  formatCookie, formattedError,getCookieByName} from "@/lib/utils";
import { SignupRequest } from "@/type/user";
import destr from "destr";
import { TypedFormData } from '@/lib/CustomFormData';
import { CreateTeamRequest, GetSettingResponse, GetTeamsType, JoinTeamRequest, SettingRequest, TeamRequest } from "@/type/team";
import { IFormattedErrorResponse } from "@/type/type";
export async function getTeams(token:string) : Promise<GetTeamsType[]
// | IFormattedErrorResponse
>{
    // const cookie = formatCookie(document.cookie)
    const cookie = getCookieByName("user")
    const {user_id} = (destr<SignupRequest>(formatCookie(cookie)))
    try{
        const {data} = await getInstance().get(`/users/teams/${user_id}`, {
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

export async function createTeam({ token, formData }: { token: string; formData: TypedFormData<CreateTeamRequest>; }){
    const cookie = getCookieByName("user")
    const {user_id} = (destr<SignupRequest>(formatCookie(cookie)))
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

export const getTeamById = async ({token , team_id }: TeamRequest) => {
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


export const getmemberByTeamId = async ({token , team_id }: TeamRequest) => {
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
export const inviteMember = async ({ token, team_id, users }: TeamRequest & {users : string[]}) => {
    try{

    const {data} = await getInstance().post(`/teams/invite/${team_id}`, {users},{
        headers:{ 
            "Authorization" : `Bearer ${token}`
        }})
        return data
    }catch(error){
        throw formattedError(error)
    }
}

export const deleteMember = async ({token , team_id , user_id } : TeamRequest & {user_id : string}) => {
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

export const getTeamSetting = async ({token , team_id } : TeamRequest) : Promise<GetSettingResponse> => {
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


export const deleteTeam = async ({token, team_id} : TeamRequest) => {
    try{
        const {data} = await getInstance().delete(`/teams/${team_id}`, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        return data;
    }catch(error){
        throw formattedError(error)
    }
}


export const UpdateTeamPermission = async ({token,team_id,permissionType,value} : TeamRequest & SettingRequest) => {
    try{
        const {data} = await getInstance().put(`/teams/permission/${team_id}`, {permission_type : permissionType, value}, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        return data;
    }catch(error){
        throw formattedError(error)
    }
}

export const updateCodeTeam = async ({token,team_id, team_code} : TeamRequest & {team_code : string}) : Promise<string | IFormattedErrorResponse> => {
    try{

    const {data} = await getInstance().put(`/teams/code/${team_id}`, {team_code}, {
        headers:{
            "Authorization" : `Bearer ${token}`
        }})
        return data;
    }catch(error){
        throw formattedError(error)
    }
}


export const LeaveTeam = async ({token , team_id } : TeamRequest) => {
    try{

        const {data} = await getInstance().delete(`/teams/exit/${team_id}`, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }})
            return data;
        }catch(error){
            throw formattedError(error)
        }
}

export const getAbout = async ({token , team_id} : TeamRequest) => {
    try{
        const {data} = await getInstance().get(`/teams/about/${team_id}`, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }})
            return data;
        }catch(error){
        throw formattedError(error)
    }
}