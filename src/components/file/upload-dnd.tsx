"use client";
import { FileTable, columns } from "@/app/(site)/teams/[teamId]/file/column";
import { DataTable } from "@/app/(site)/teams/[teamId]/file/data-table";
import React, { useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
// import { toast } from "sonner"
 
type UploadProps = {
	data: FileTable[];
};

const UploadDnd = ({ data }: UploadProps) => {
	const [dragActive, setDragActive] = useState<boolean>(false);
	const inputRef = useRef<any>(null);
	const [files, setFiles] = useState<any>([]);
    const {toast} = useToast()
	function handleChange(e: any) {
		e.preventDefault();
		console.log("File has been added");
		if (e.target.files && e.target.files[0]) {
			console.log(e.target.files);
			for (let i = 0; i < e.target.files["length"]; i++) {
				setFiles((prevState: any) => [...prevState, e.target.files[i]]);
			}
		}
	}

	async function handleSubmitFile(e: any) {
		const formData = new FormData();
		if (files.length === 0) {
			// no file has been submitted
		} else {
			// write submit logic here
			files.forEach((file: File) => {
				console.log(typeof file, "check type file");
				formData.append("files", file);
			});
			console.log(formData.get("file"));
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_PROD_URL}/files/upload`,
				{
					method: "POST",
					body: formData,
				}
			);
			console.log(response);
		}
	}

	function handleDrop(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
				setFiles((prevState: any) => [
					...prevState,
					e.dataTransfer.files[i],
				]);
                toast({title : `File ${e.dataTransfer.files[i].name} has uploading`})
			}
		}
	}

	function handleDragLeave(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	}

	function handleDragOver(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	}

	function handleDragEnter(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	}

	function removeFile(fileName: any, idx: any) {
		const newArr = [...files];
		newArr.splice(idx, 1);
		setFiles([]);
		setFiles(newArr);
	}

	function openFileExplorer() {
		inputRef.current.value = "";
		inputRef.current.click();
	}
	return (
		<div>
			<form
				className={`${
					dragActive ? "bg-white" : "bg-white"
				}  p-4 w-screen rounded-lg h-screen text-center flex flex-col`}
				onDragEnter={handleDragEnter}
				onSubmit={(e) => e.preventDefault()}
				onDrop={handleDrop}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
			>
				{/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
				<input
					placeholder="fileInput"
					className="hidden"
					ref={inputRef}
					type="file"
					multiple={true}
					onChange={handleChange}
					accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
				/>

				{/* <p>
      Drag & Drop files or{" "}
      <span
        className="font-bold text-blue-600 cursor-pointer"
        onClick={openFileExplorer}
      >
        <u>Select files</u>
      </span>{" "}
      to upload
    </p> */}

				<div className="flex flex-col ">
					{/* {files.map((file: any, idx: any) => (
        <div key={idx} className="flex flex-row space-x-5">
          <span>{file.name}</span>
          <span
            className="text-red-500 cursor-pointer"
            onClick={() => removeFile(file.name, idx)}
          >
            remove
          </span>
        </div>
      ))} */}
					<DataTable columns={columns} data={data} />
				</div>

				{/* <button
    disabled={files.length === 0}
      className="bg-black rounded-lg p-2 mt-3 w-auto"
      onClick={handleSubmitFile}
    >
      <span className="p-2 text-white">Submit</span>
    </button> */}
			</form>
		</div>
	);
};

export default UploadDnd;
