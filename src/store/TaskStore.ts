import { Task } from "@/components/kanban/TaskCard";
import {create} from"zustand";
import { devtools } from 'zustand/middleware';

interface TaskState{
    tasks:Task[];
    addTask:(task:Task)=>void;
    setTasks:(tasks:Task[])=>void;
    updateTask:(task:Task)=>void;
    deleteTask:(id:string)=>void;
}

export const useTaskStore = create<TaskState>((set) => ({
   tasks: [
    {
      id: "1a2b3c",
      columnId: "todo",
      title: "Complete Project Proposal",
      description: "Draft a detailed project proposal for the upcoming software development project.",
      assignee: "U000012",
      duedate: "2024-03-10",
    },
    { 
      id: "4d5e6f",
      columnId: "todo",
      title: "Review Code Changes",
      description: "Review and provide feedback on recent code changes related to the authentication module.",
      assignee: "U000125",
      duedate: "2024-03-05",
    },
    {
      id: "7g8h9i",
      columnId: "in-progress",
      title: "Bug Fix: User Profile Page",
      description: "Investigate and fix the issue causing incorrect display of user profile information.",
      assignee: "U000012",
      duedate: "2024-03-08",
    },
    {
      id: "jklmno",
      columnId: "done",
      title: "Write API Documentation",
      description: "Document the endpoints and usage instructions for the RESTful API.",
      assignee: "U000124",
      duedate: "2024-03-12",
    },
    {
      id: "pqrst",
      columnId: "in-progress",
      title: "Test Data Validation",
      description: "Create test cases to validate input data for the new registration form.",
      assignee: "U000124",
      duedate: "2024-03-07",
    },
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
  },
  updateTask:(task : Task)=>{
        const tasks = useTaskStore.getState().tasks;
        set((state)=>({
            tasks:state.tasks.map((t)=>{
              console.log(t.id, task.id, 'update task')
              return t.id === task.id ?   task : t
            })
        }))
        console.log(tasks, 'update task')
  },
  deleteTask:(id:string)=>{
        set((state)=>({
            tasks:state.tasks.filter((t)=>t.id !== id)
      }))
  }    
}))