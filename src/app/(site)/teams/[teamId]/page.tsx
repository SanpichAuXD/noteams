import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
type Props = {}

const Team = ({ params }: { params: { teamId: string } }) => {
  return (
    <div className="p-4">
        <div className='flex justify-between h-[10%]'>
            <div className="inline-block  h-[5%]">

            <Image 
           src={'https://placehold.co/600x500/png'}
           alt="reg-vector"
           width={0}
           height={0}
           sizes='100vw'
           className='w-[20%] h-[20%] p-2'           
           />
           <p>Team Name</p>
           </div>
            <Button>Invite</Button>
        </div>
       <nav className="bg-red-900 p-2">
            <ul className="flex justify-start gap-8 items-center">
                <Link href="#">ABOUT</Link>
                <Link href="#">ABOUT</Link>
                <Link href="#">ABOUT</Link>
                <Link href="#">ABOUT</Link>
                <Link href="#">ABOUT</Link>
                </ul>
        </nav>
        Team {params.teamId}
    </div>
  )
}

export default Team