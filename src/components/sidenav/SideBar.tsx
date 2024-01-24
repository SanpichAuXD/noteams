import { PersonStandingIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const SideBar = (props: Props) => {
  return (
    <div className='flex flex-col items-center gap-4 w-[100px] bg-emerald-900'>
        <SideBarItems />
        <SideBarItems />
        <SideBarItems />
        <SideBarItems />
        <SideBarItems />
        </div>
  )
}

const SideBarItems = () => {
    return (
        
        <div className='text-center'>
            <PersonStandingIcon className='text-center inline' size={42} />
            <p>Noteams</p>
        </div>
        
    )
}

export default SideBar