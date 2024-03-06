import { getInstance } from "@/api/apiClient";
import { Task } from "@/components/kanban/TaskCard";
import { formattedError, getUserCookie } from "@/lib/utils";
import { getAllTaskResponse } from "@/type/task";
import { TeamRequest } from "@/type/team";
import { IFormattedErrorResponse } from "@/type/type";
import { TypedFormData, getTypedFormData } from '@/lib/CustomFormData';

export async function getAllTask({ token, team_id }: TeamRequest) : Promise<Task[] | IFormattedErrorResponse> {
    try {
        const {data}  = await getInstance().get(`/task/${team_id}`,{
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

export async function createTask({formData,team_id, token} : {formData : FormData} & TeamRequest) : Promise<any | IFormattedErrorResponse> {
    

    try {
        const {data}  = await getInstance().post(`/task/${team_id}`,formData,{
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


export async function updateStatusTask({task_id, status, team_id, token} : {task_id : string, status : string} & TeamRequest) : Promise<any | IFormattedErrorResponse> {
    const formData = new FormData();
    formData.append('task_id', task_id);
    formData.append('task_status', status);
    try {
        const {data}  = await getInstance().put(`/task/${team_id}`,formData,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        }
        );
        return data 
    } catch (error) {
       throw formattedError(error)
    }
}

export async function updateTask({task_id, formData, team_id, token} : {task_id : string, formData : FormData} & TeamRequest) : Promise<any | IFormattedErrorResponse> {
    try {
        const {data}  = await getInstance().put(`/task/${team_id}`,formData,{
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

export async function deleteTask({task_id, team_id, token} : {task_id : string} & TeamRequest) : Promise<any | IFormattedErrorResponse> {
    const formData = new FormData();
    formData.append('task_id', task_id);
    try { 
        const {data}  = await getInstance().delete(`/task/${team_id}`,{
            headers : {
                "Authorization" : `Bearer ${token}`
            },
            data : formData
        }
        );
        return data 
    } catch (error) {
        return formattedError(error)
    }
}