"use client"
import { useRef, useState } from "react";
import { FileTable, columns } from "@/components/file/column";
import { DataTable } from "@/components/file/data-table";
import UploadDnd from "@/components/file/upload-dnd";
import { useFileStore } from "@/store/FileStore";
export default function DragAndDrop() {
  
  return (
    <div className="flex items-center justify-center bg-blue-700">
      <UploadDnd  />
    </div>
  );
}