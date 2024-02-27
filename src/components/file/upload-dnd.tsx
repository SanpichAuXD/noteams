"use client";
import { FileTable, columns } from "@/components/file/column";
import { DataTable } from "@/components/file/data-table";
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
// import { toast } from "sonner"
 import { useFileStore } from './../../store/FileStore';
import { Files, Upload } from "lucide-react";
import { Button } from "../ui/button";
import UploadButton from "./UploadButton";

// type UploadProps = {
// 	data: FileTable[];
// };

const UploadDnd = (
	// { data }: UploadProps
	) => {
	const [dragActive, setDragActive] = useState<boolean>(false);
	const inputRef = useRef<any>(null);
	const {addFile,files} = useFileStore()
	const [files1, setFiles] = useState<any>([]);
    const {toast} = useToast()
	// useEffect(() => {
	// 	setFilestate(data)
	// }, [data,	setFilestate]);
	const role = 'member'
	console.log(files)
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

	// async function handleSubmitFile(e: any) {
	// 	const formData = new FormData();
	// 	if (files1.length === 0) {
	// 		// no file has been submitted
	// 	} else {
	// 		// write submit logic here
	// 		files.forEach((file: File) => {
	// 			console.log(typeof file, "check type file");
	// 			formData.append("files", file);
	// 		});
	// 		console.log(formData.get("file"));
	// 		const response = await fetch(
	// 			`${process.env.NEXT_PUBLIC_API_PROD_URL}/files/upload`,
	// 			{
	// 				method: "POST",
	// 				body: formData,
	// 			}
	// 		);
	// 		console.log(response);
	// 	}
	// }

	function handleDrop(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			console.log("file drop")
			for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
				setFiles((prevState: any) => [
					...prevState,
					e.dataTransfer.files[i],
				]);
				addFile({
					id: "3",
					name: e.dataTransfer.files[i].name,
					email: "email3",
					url: "url3",
					createdAt: new Date().toDateString(),
				});
                toast({title : `File ${e.dataTransfer.files[i].name} has uploading`})
			}
			// console.log([...data, ...files]);
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
		<div className="w-full max-h-min">
			<form
				className={`${
					dragActive ? "bg-slate-200 border-double-4 border-blue-500 " : "bg-white"
				}  px-32  py-5 w-full  h-screen text-center flex flex-col`}
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
					accept="image/*,.pdf"
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

				<div className="flex flex-col justify-center items-center">
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
	  				
					<DataTable columns={columns} data={files} />
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
