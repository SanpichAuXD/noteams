import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
type Props = {}

const Team = ({ params }: { params: { teamId: string } }) => {
  return (
    <div className="p-4">
       
        Team {params.teamId}
    </div>
  )
}

export default Team