"use client"
import React, { useState } from 'react'
import Sidenav from './SliderBar';

type Props = {}

const Header = (props: Props) => {
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