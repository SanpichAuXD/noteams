

import React from 'react'

import FullCalendar from '@fullcalendar/react'
import CalendarC from '@/components/calendarcomponent/calendarcompo'
import { cookies } from 'next/headers';
import { SignupRequest } from '@/type/user';
import destr from 'destr';
import { GetCalendar } from '@/api-caller/user';

const events = [
  { title: 'Meeting', start: new Date() }
]

async function Calendar() {
  const cookie = cookies().get("accessToken")?.value!;
	const users = cookies().get("user")?.value!;
	const {user_id} = destr<SignupRequest>(users);

  const teamxd = await GetCalendar(cookie, user_id);
	console.log("CAlendar",teamxd)


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