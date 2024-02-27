import { DataTable } from '@/components/file/data-table'
import { User } from '@/type/user'
import React from 'react'
import { columns } from './column'

type Props = {}
type MemberUser = User & {role : 'owner' | 'member'}
const File  = ({ params }: { params: { teamId: string } }) => {
  const user : MemberUser[] = [
    {
      id: '1',
      username: 'John Doe',
      email: 'asasasasas',
      role: 'owner'
    },
    {
      id: '2',
      username: 'Jane Doe',
      email: 'asasasasas',
      role : 'member'
    },
    {
      id: '3',
      username: 'John Doe',
      email: 'asasasasas',
      role : 'member'
    }
  ]
  return (
    <div className="min-h-[90vh] p-10  flex flex-col items-center">
      <p className="text-xl font-bold">Member</p>
      <DataTable data={user} columns={columns}/>
      </div>
  )
}

export default File