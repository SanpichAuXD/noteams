"use client";

import React, { Fragment, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { Dialog, Transition } from "@headlessui/react";

const events = [
  // { title: "Meeting", start: new Date() },
  { id: "97", title: "Meetong1", start: "2024-02-01", description: "Meeting" },
  // { id: "98", title: "Meetong2", start: "2024-02-02", description: "Meeting" },
  // { id: "99", title: "Meetong3", start: "2024-02-03", description: "Meeting" },
  // { id: "100", title: "Meetong4", start: "2024-02-04", description: "Meeting" },
  // { id: "101", title: "Meetong5", start: "2024-02-05", description: "Meeting" },
  // { id: "102", title: "Meetong6", start: "2024-02-06", description: "Meeting" },
];

interface Event {
  title: string;
  start: Date | string;
  id: number | string;
  description: string;
}

interface ChildComponentProps {
  teams: Event[];
}

function CalendarC({teams} : ChildComponentProps) {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [fetchDaysApi, setFetchDaysApi] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [idToOpen, setIdToOpen] = useState("");
  
  // const team = teamxd;
  // console.log("team props = ", teams)

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
          id: number | string;
          description: string;
        };

        // Map over keys to create an array of objects
        const daysData = keys.map((key: any, index) => ({
          start: key.start.date,
          title: key.summary,
          description: key.description,
          id: String(index),
        }));

        setFetchDaysApi(daysData);
        setAllEvents(daysData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(allEvents);

  const Merge = [...allEvents, ...events];
  const Merge2 : Event[] = [...Merge, ...teams]

  // console.log("Merget2 ",Merge2)


  function handleOpenModal(data: { event: { id: string } }) {
    setShowOpenModal(true);
    setIdToOpen(data.event.id);
  }

  function handleCloseModal() {
    setShowModal(false);
    setShowOpenModal(false);
    setIdToOpen("");
  }

  return (
    <>
      <div className=" bg-[#FFF7F1] p-10 rounded-md">
        <FullCalendar
          height={520}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={Merge2 as EventSourceInput}
          nowIndicator={true}
          eventContent={renderEventContent}
          eventClick={(data) => handleOpenModal(data)}
        />
      </div>

      <Transition.Root show={showOpenModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowOpenModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* <div
                          className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full  sm:mx-0 sm:h-10 sm:w-10"
                        >
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div> */}
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {/* {idToOpen} */}

                          {Merge2.map((event) =>
                            event.id === idToOpen ? event.title : null
                          )}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-800">
                            {Merge2.map((event) =>
                              event.id === idToOpen ? event.description : null
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {/* <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleOpen}
                      >
                        Open
                      </button> */}
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );

  function rederDetailEvent() {}
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
