"use client"

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { never } from "zod";
import { eventNames } from "process";


const events = [
  { title: "Meeting", start: new Date() },
  { title: "Meetong", start: "2024-02-01" },
];

interface Event {
  title: string;
  start: Date | string;
  
}

function CalendarC() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [fetchDaysApi, setFetchDaysApi] = useState<Event[]>([]);

  // API WAN YUTH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/calendar/v3/calendars/th.TH%23holiday%40group.v.calendar.google.com/events?key=AIzaSyDrbYPWVYOYreGtGN2SkGfqTbG0_xk-GTE"
        );
        const data = await response.json();

        const keys = Object.values(data.items);

        type data = {
          title: string;
          start: Date | string;
          
        };

        // Map over keys to create an array of objects
        const daysData = keys.map((key: any, index) => ({
          start: key.start.date,
          title: key.summary,
          id: String(index),
          allDay: true,
        }));

        setFetchDaysApi(daysData);
        setAllEvents(daysData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(allEvents)

  const Merge = [...allEvents, ...events]
  
  return (
    <div className=" bg-[#FFF7F1] p-5">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={Merge}
        nowIndicator={true}
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo: {
  timeText:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  event: {
    title:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | React.PromiseLikeOfReactNode
      | null
      | undefined;
  };
}) {
  return (
    <>
      <b>{eventInfo.timeText} </b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalendarC;
