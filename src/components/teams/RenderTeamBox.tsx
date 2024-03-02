"use client"
import React from 'react'
import TeamsBox from './TeamsBox'
import { useGetAllTeam } from '@/store/TeamState'
import { isResponseError } from '@/lib/utils';
import { GetTeamsType } from '@/type/team';

type Props = {
    token : string;
}

const RenderTeamBox = ({token}: Props) => {
    const {data, isError,isSuccess} = useGetAllTeam(token);
    
    if(isError){
        return <div>error</div>
    }
    
    console.log(data)
  return (
    <>
    {data && data.map(({team_id,team_poster,team_name}: GetTeamsType, i: number)=>{
					return <TeamsBox key={i} id={team_id} image={team_poster} title={team_name} />
				})}
    </>
  )
}

export default RenderTeamBox