import { DataTable } from '@/components/file/data-table'
import { MemberUser, User } from '@/type/user'
import React from 'react'
import { columns } from './column'
import { cookies } from 'next/headers'
import { getmemberByTeamId } from '@/api-caller/team'
import { HydrationBoundary, QueryClient, dehydrate, useQueryClient } from "@tanstack/react-query";
import { MemberTable } from './data-table'
import WithAuth from '@/components/ui/WithAuth'

type Props = {}
const File  = async({ params }: { params: { teamId: string } }) => {
  const token = cookies().get("accessToken")?.value!;
	
	
		const member = await getmemberByTeamId({token, team_id:params.teamId})
 
  return (
    <div className="min-h-[90vh] p-10  flex flex-col items-center">
      <p className="text-xl font-bold">Member</p>
      <MemberTable 
      token={token} 
      team_id={params.teamId}
       columns={columns} data={member} 
       />
      </div>
  )
}

export default WithAuth(File)