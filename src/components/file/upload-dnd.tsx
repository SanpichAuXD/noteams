"use client";
import { FileTable, columns } from "@/components/file/column";
import { DataTable } from "@/components/file/data-table";
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
// import { toast } from "sonner"
import { Files, Upload } from "lucide-react";
import { Button } from "../ui/button";
import UploadButton from "./UploadButton";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { TeamFile } from "@/type/team";
import { IFormattedErrorResponse } from "@/type/type";
import { getFiles, uploadFile } from "@/api-caller/file";

type UploadProps = {
	token : string;
	team_id : string
};

const UploadDnd = (
	// { data }: UploadProps
	{token, team_id} : UploadProps
	) => {
	const {data} = useQuery<TeamFile[], IFormattedErrorResponse>({
		queryKey: [`hydrate-file-${team_id}`],
		queryFn: async () => await getFiles({ token: token, team_id:team_id }),
		
	});
	console.log(data, 'hydrate file')
	const [dragActive, setDragActive] = useState<boolean>(false);
	const inputRef = useRef<any>(null);
	const [files1, setFiles] = useState<any>([]);
    const {toast} = useToast()
	// useEffect(() => {
	// 	setFilestate(data)
	// }, [data,	setFilestate]);
	const role = 'member'
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

	const queryClient = useQueryClient();

	const mutation = useMutation<TeamFile[], IFormattedErrorResponse, FormData>({
		mutationFn: async (formData) => {
			return await uploadFile({token:token, team_id:team_id, formData});
		},
		onSuccess: () => {
			console.log("success");
			queryClient.invalidateQueries({ queryKey: ["hydrate-file"] });
		},
		onError: (error) => {
			toast({title : error.message, variant : 'destructive'})
		},
	});

	function handleDrop(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			console.log("file drop")
			const formData = new FormData()
			for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
				formData.append('files', e.dataTransfer.files[i])
				
                toast({title : `File ${e.dataTransfer.files[i].name} has uploading`})
			}
			mutation.mutate(formData)
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
					{data && <DataTable columns={columns} data={data!} token={token} team_id={team_id} />}
				</div>
{/* 
				<button
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
