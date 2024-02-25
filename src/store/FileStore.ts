import { FileTable } from "@/components/file/column";
import {create} from"zustand";
import { devtools } from 'zustand/middleware';

interface FileState{
    files:FileTable[];
    addFile:(file: FileTable)=>void;
    setFiles:(files:FileTable[])=>void;
    deleteFile:(id:string)=>void;
}

export const useFileStore = create<FileState>((set) => ({
   files: [
    {
        id:"1",
        name:"file1",
        email:"email1",
        url:"url1",
        createdAt:"createdAt1"
    },
    {
        id:"2",
        name:"file2",
        email:"email2",
        url:"url2",
        createdAt:"createdAt2"
    }
  ],
  addFile:(file:FileTable)=>{
    console.log('add')
      set((state)=>({
          files:[...state.files,file],
      }))
      console.log(useFileStore.getState().files, 'added')
  },
  setFiles:(files:FileTable[])=>{
    console.log(files)
        set((state)=>({
            files
        }))
    },
    deleteFile:(id:string)=>{
        set((state)=>({
            files:state.files.filter((file)=>file.id!==id)
        }))
    }

    
}))