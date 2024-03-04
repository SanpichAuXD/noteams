import { getAllTask } from "@/api-caller/task";
import { Task } from "@/components/kanban/TaskCard";
import { isResponseError } from "@/lib/utils";
import { IFormattedErrorResponse } from "@/type/type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTask = (token : string, team_id  : string) =>{
    return useQuery<Task[],IFormattedErrorResponse>({
        queryKey: [`task-${team_id}`],
        queryFn : async () => {
            const response  = await getAllTask({token, team_id});
            console.log('we are fetching')
            if(isResponseError(response)){
                throw response
            }
            return response as Task[]
        },
        staleTime : 1000 * 10,
    })
}