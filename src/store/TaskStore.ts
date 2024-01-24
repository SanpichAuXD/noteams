import { Task } from "@/components/kanban/TaskCard";
import {create} from"zustand";
import { devtools } from 'zustand/middleware';

interface TaskState{
    tasks:Task[];
    addTask:(task:Task)=>void;
    setTasks:(tasks:Task[])=>void;
}

export const useTaskStore = create<TaskState>((set) => ({
   tasks: [
    {
      id: "task1",
      columnId: "done",
      content: "Project initiation and planning",
    },
    {
      id: "task2",
      columnId: "done",
      content: "Gather requirements from stakeholders",
    },
    {
      id: "task3",
      columnId: "done",
      content: "Create wireframes and mockups",
    },
    {
      id: "task4",
      columnId: "in-progress",
      content: "Develop homepage layout",
    },
    {
      id: "task5",
      columnId: "in-progress",
      content: "Design color scheme and typography",
    },
    {
      id: "task6",
      columnId: "todo",
      content: "Implement user authentication",
    },
    {
      id: "task7",
      columnId: "todo",
      content: "Build contact us page",
    },
    {
      id: "task8",
      columnId: "todo",
      content: "Create product catalog",
    },
    {
      id: "task9",
      columnId: "todo",
      content: "Develop about us page",
    },
    {
      id: "task10",
      columnId: "todo",
      content: "Optimize website for mobile devices",
    },
    {
      id: "task11",
      columnId: "todo",
      content: "Integrate payment gateway",
    },
    {
      id: "task12",
      columnId: "todo",
      content: "Perform testing and bug fixing",
    },
    {
      id: "task13",
      columnId: "todo",
      content: "Launch website and deploy to server",
    }
  ],
  addTask:(task:Task)=>{
      set((state)=>({
          tasks:[...state.tasks,task],
      }))
      console.log(useTaskStore.getState().tasks)
  },
  setTasks:(tasks:Task[])=>{
        set((state)=>({
            tasks
        }))
    }
    
}))