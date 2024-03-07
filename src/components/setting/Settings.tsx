"use client"
import React from 'react'
import SettingImage from './SettingImage'
import SettingForm from './SettingForm';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTeamSetting } from '@/api-caller/team';
import { GetSettingResponse, GetTeamType, TeamData, TeamSetting } from '@/type/team';
import { IFormattedErrorResponse } from '@/type/type';

type SettingsProps = {
    token : string;
    team_id : string;
    team : GetSettingResponse;
}

const Settings = ({token,team_id,team}: SettingsProps) => {
    const { data } = useQuery<GetSettingResponse,IFormattedErrorResponse>({
        queryKey: [`setting-${team_id}`],
		queryFn: ()=> getTeamSetting(token, team_id),
        initialData : team,
        staleTime: 10 * 1000,
      });
      console.log(`team-${team_id}`)
      const queryClient  = useQueryClient();
      const teamData = queryClient.getQueryData<GetTeamType>([`team-${team_id}`]);
      const role = teamData ? teamData!.user_role : 'OWNER'
  return (
    <div className="flex flex-row justify-center py-5">
							<SettingImage token={token} role={role} team_id={team_id} image={team.team_poster} />
							<div className="flex w-1/2">
								<SettingForm token={token} role={role}  team={{
                                    team_name : data.team_name,
                                    team_desc : data.team_desc,
                                    team_poster : data.team_poster,
                                    team_id : team_id,
                                }}/>
							</div>
						</div>
  )
}

export default Settings