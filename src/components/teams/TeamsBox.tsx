import { cookies } from 'next/headers'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
type TeamsBoxProps = {
  id:string
  image: string
  title: string
}

const TeamsBox = ({id,image,title} : TeamsBoxProps) => {
  return (
    <Link className="bg-white shadow-xl  rounded  h-[200px]  flex flex-col justify-center items-center p-5" href={`teams/${id}`}>

      <Image
        src={image}
        alt="reg-vector"
        width={0}
        height={0}
        sizes='100vw'
        className='w-[100%] h-[100%] p-2'
        />
        <div className='font-bold w-full mt-[5%]'>
          <p className='text-center text-lg'>{title}</p>
        </div>
    </Link>
  )
}

export default TeamsBox