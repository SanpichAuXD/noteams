// "use client"
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="mx-4 flex flex-col gap-6 p-5">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Drag and Drop Kanban Board 
            </h1>
            <KanbanBoard />
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              With Keyboard Controls and Screen Reader interactions.
            </p>
          </main>
  )
}
