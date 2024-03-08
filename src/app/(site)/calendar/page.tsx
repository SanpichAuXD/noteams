

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

interface Event {
  title: string;
  start: Date | string;
  id: number | string;
  description: string;
}

async function Calendar() {
  const cookie = cookies().get("accessToken")?.value!;
	const users = cookies().get("user")?.value!;
	const {user_id} = destr<SignupRequest>(users);

  const teamxd = await GetCalendar(cookie, user_id);
	// console.log("CAlendar = ",teamxd.data)

  const calendar1 = teamxd.data

  // console.log("Calendar1 = ",calendar1)

//   const transformedObject = {
//     id: calendar1.task_id,
//     title: calendar1.task_name,
//     task_status: calendar1.task_status,
//     description: calendar1.task_desc,
//     start: calendar1.task_deadline
// };

const transformedObjects : Event[] = calendar1.map((x: any) => ({
  id: (x).task_id,
  title: (x).task_name,
  description: (x).task_desc,
  start: (x).task_deadline
}));


// console.log("Fix Calendar = ", transformedObjects);


  return (
    <main>
        <p className=' font-bold text-5xl p-3 underline underline-offset-8'>Calendar</p>
        <div className=' border-sky-500 mt-10 mx-10 mb-10'>
        <CalendarC teams={transformedObjects} />
        </div>
    </main>
  )
}

export default Calendar