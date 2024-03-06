// UploadButton.tsx
"use client";
import React, { use } from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFormattedErrorResponse } from "@/type/type";
import { TeamFile } from "@/type/team";
import { toast } from "sonner";
import { uploadFile } from "@/api-caller/file";
type UploadProps = {
  token: string;
  team_id: string;
  multiple?: boolean;
};
const UploadButton = ({token , team_id, multiple} : UploadProps) => {
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
			console.log(error);
		},
	});
	const handleFileUpload = () => {
		// Trigger the file input click event
		const fileInput = document.getElementById("fileInput");
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			//   // Handle the selected file (e.g., upload to server)
      const formData = new FormData()
			for (let i = 0; i < event.target.files!.length; i++) {
			  const file = event.target.files![i];
        formData.append('files', file)
			}
      mutation.mutate(formData)
		}
	};

	return (
		<div>
			<Button onClick={handleFileUpload}>Upload File</Button>
			<input
				id="fileInput"
				type="file"
				style={{ display: "none" }}
				accept=".pdf, .jpg, .jpeg, .png"
				onChange={handleFileSelected}
        multiple={!!multiple ? multiple : true}
			/>
		</div>
	);
};

export default UploadButton;
