import { Task } from "@/components/kanban/TaskCard";
import {create} from"zustand";
import { devtools } from 'zustand/middleware';

interface TaskState{
    tasks:Task[];
    addTask:(task:Task)=>void;
    setTasks:(tasks:Task[])=>void;
    updateTask:(task:Task)=>void;
    deleteTask:(id:string)=>void;
    fetchTask:(token:string,team_id:string)=>void;
}

export const useTaskStore = create<TaskState>((set) => ({
   tasks: [
    {
      task_id: "1a2b3c",
      task_status: "TODO",
      task_name: "Complete Project Proposal",
      task_desc: "Draft a detailed project proposal for the upcoming software development project.",
      user_id: "U000012",
      task_deadline: "2024-03-10",
    },
    { 
      task_id: "4d5e6f",
      task_status: "TODO",
      task_name: "Review Code Changes",
      task_desc: "Review and provide feedback on recent code changes related to the authentication module.",
      user_id: "U000125",
      task_deadline: "2024-03-05",
    },
    {
      task_id: "7g8h9i",
      task_status: "DOING",
      task_name: "Bug Fix: User Profile Page",
      task_desc: "Investigate and fix the issue causing incorrect display of user profile information.",
      user_id: "U000012",
      task_deadline: "2024-03-08",
    },
    {
      task_id: "jklmno",
      task_status: "DONE",
      task_name: "Write API Documentation",
      task_desc: "Document the endpoints and usage instructions for the RESTful API.",
      user_id: "U000124",
      task_deadline: "2024-03-12",
    },
    {
      task_id: "pqrst",
      task_status: "DOING",
      task_name: "Test Data Validation",
      task_desc: "Create test cases to validate input data for the new registration form.",
      user_id: "U000124",
      task_deadline: "2024-03-07",
    },
  ],
  addTask:(task:Task)=>{
      set((state)=>({
          tasks:[...state.tasks,task],
      }))
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
              console.log(t.task_id, task.task_id, 'update task')
              return t.task_id === task.task_id ?   task : t
            })
        }))
  },
  deleteTask:(id:string)=>{
        set((state)=>({
            tasks:state.tasks.filter((t)=>t.task_id !== id)
      }))
  }    
}))