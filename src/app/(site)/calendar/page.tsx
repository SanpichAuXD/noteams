"use client"

import React from 'react'

import FullCalendar from '@fullcalendar/react'
import CalendarC from '@/components/calendarcomponent/calendarcompo'

const events = [
  { title: 'Meeting', start: new Date() }
]

function Calendar() {
  return (
    <main>
        <p className=' font-bold text-5xl p-3 underline underline-offset-8'>Calendar</p>
        <div className=' border-sky-500 mt-10 mx-10 mb-10'>
        <CalendarC />
        </div>
    </main>
  )
}

export default Calendar