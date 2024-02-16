import { cookies } from 'next/headers'
import React from 'react'
import Image from 'next/image'
type TeamsBoxProps = {
  image: string
  title: string
}

const TeamsBox = ({image,title} : TeamsBoxProps) => {
  return (
    <div className="bg-white shadow-xl  rounded  h-[200px]  flex flex-col justify-center items-center p-5">

      <Image
        src={'https://placehold.co/600x500/png'}
        alt="reg-vector"
        width={0}
        height={0}
        sizes='100vw'
        className='w-[70%] h-[70%] max-w-[70%]'
        />
        <div className='font-bold w-full mt-[5%]'>
          <p className='text-center text-lg'>My TEAMS</p>
        </div>
    </div>
  )
}

export default TeamsBox