import {QueryClient, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { CreateTeamRequest, GetTeamType, GetTeamsType } from '@/type/team';
import { createTeam, getTeamById, getTeams } from '@/api-caller/team';
import { TypedFormData } from '@/lib/CustomFormData';
import { IFormattedErrorResponse } from '@/type/type';




export const useGetAllTeam = (token : string) =>{
    return useQuery<GetTeamsType[],IFormattedErrorResponse>({
        queryKey: ['hydrate-team'],
        queryFn : async () => await getTeams(token),
        staleTime : 1000 * 10,
    })
}

export const useTeam = (token : string, team_id : string) => {
    return useQuery<GetTeamType,IFormattedErrorResponse>({
        queryKey : ['team'],
        queryFn : async () => await getTeamById(token,team_id),
        staleTime : 1000,
        refetchOnReconnect : true,

    })
}

export const useCreateTeam = (token : string, formData : TypedFormData<CreateTeamRequest>) => {
    const queryClient = useQueryClient()
    return useMutation<GetTeamsType[],Error,GetTeamsType>({
        mutationFn : async () => {
            const {data} = await createTeam({ token, formData });
            return data;
        },
        onSuccess : () => {
            console.log('success')
            queryClient.invalidateQueries({queryKey : ['team']})
        }
        
    })
}


