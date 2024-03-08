import { getInstance } from "@/api/apiClient";
import { formattedError } from "@/lib/utils";
import { TeamRequest } from "@/type/team";
import { IFormattedErrorResponse } from "@/type/type";

export async function uploadFile({token, team_id , formData} : TeamRequest &  { formData : FormData}) : Promise<any | IFormattedErrorResponse> {
    try {
        const {data}  = await getInstance().post(`/files/upload/${team_id}`,formData,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        }
        );
        return data 
    } catch (error) {
        return formattedError(error)
    }

}


export async function getFiles({token, team_id} : TeamRequest){
    try {
        const {data}  = await getInstance().get(`/files/team/${team_id}`,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        }
        );
        console.log(data, 'get files')
        return data 
    } catch (error) {
        return formattedError(error)
    }
}

export async function deleteFile({token, team_id, formData} : TeamRequest & {formData : FormData})  {
    try {
        const {data}  = await getInstance().delete(`/files/${team_id}`,{
            headers : {
                "Authorization" : `Bearer ${token}`
            },
            data:formData
        }
        );
        return data 
    } catch (error) {
        throw formattedError(error)
    }
}