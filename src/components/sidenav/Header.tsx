"use client"
import React, { useState } from 'react'
import Sidenav from './SliderBar';
import { User } from '@/type/user';

type Props = {
    user: User
}

const Header = ({user}: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
        {/* Render the Sidenav component */}
        <Sidenav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

      </div>)
}

export default Header