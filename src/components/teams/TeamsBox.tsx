import { cookies } from 'next/headers'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
type TeamsBoxProps = {
  image: string
  title: string
}

const TeamsBox = ({image,title} : TeamsBoxProps) => {
  return (
    <Link className="bg-white shadow-xl  rounded  h-[200px]  flex flex-col justify-center items-center p-5" href="teams/1/">

      <Image
        src={'https://placehold.co/600x500/png'}
        alt="reg-vector"
        width={0}
        height={0}
        sizes='100vw'
        className='w-[100%] h-[100%] p-2'
        />
        <div className='font-bold w-full mt-[5%]'>
          <p className='text-center text-lg'>My TEAMS</p>
        </div>
    </Link>
  )
}

export default TeamsBox