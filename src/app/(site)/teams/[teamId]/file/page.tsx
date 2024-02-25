
import { useRef, useState } from "react";
import { FileTable, columns } from "@/components/file/column";
import { DataTable } from "@/components/file/data-table";
import UploadDnd from "@/components/file/upload-dnd";
export default async function DragAndDrop() {
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

  const data = await getData()
  return (
    <div className="flex items-center justify-center bg-blue-700">
      <UploadDnd data={data} />

    </div>
  );
}