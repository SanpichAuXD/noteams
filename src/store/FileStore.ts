import { FileTable } from "@/components/file/column";
import {create} from"zustand";
import { devtools } from 'zustand/middleware';

interface FileState{
    files:FileTable[];
    addFile:(file: FileTable)=>void;
    setFiles:(files:FileTable[])=>void;
    deleteFile:(id:string)=>void;
}
async function getData(): Promise<FileTable[]> {
    return  [
      {
        id: "1",
        name: "File1 sadasdasdsadad",
        email: "file1@example.com",
        url: "http://example.com/file1",
        createdAt: "2024-02-22T10:00:00Z"
      },
      {
        id: "2",
        name: "File2",
        email: "file2@example.com",
        url: "http://example.com/file2",
        createdAt: "2024-02-21T09:30:00Z"
      },
      {
        id: "3",
        name: "File3",
        email: "file3@example.com",
        url: "http://example.com/file3",
        createdAt: "2024-02-20T15:45:00Z"
      },
      {
        id: "4",
        name: "File4",
        email: "file4@example.com",
        url: "http://example.com/file4",
        createdAt: "2024-02-19T12:20:00Z"
      },
      {
        id: "5",
        name: "File5",
        email: "file5@example.com",
        url: "http://example.com/file5",
        createdAt: "2024-02-18T08:10:00Z"
      },
      {
        id: "6",
        name: "File6",
        email: "file6@example.com",
        url: "http://example.com/file6",
        createdAt: "2024-02-17T11:55:00Z"
      },
    ]
  }
export const useFileStore = create<FileState>((set) => ({
   files: [
  ],
  addFile:(file:FileTable)=>{
    console.log('add')
      set((state)=>({
          files:[...state.files,file],
      }))
      console.log(useFileStore.getState().files, 'added')
  },
  setFiles:(files:FileTable[])=>{
    // console.log(files)
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
getData().then((file) => useFileStore.setState({ files : file }))
