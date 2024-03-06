"use client"
import React from 'react'
import {Button} from "@/components/ui/button"
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IFormattedErrorResponse } from '@/type/type';
import { updateTeamProfile } from '@/api-caller/team';
import { toast, useToast } from '@/components/ui/use-toast';

type SettingImageProps = {
    image : string
    token : string;
    team_id : string;
    role : 'MEMBER' | "OWNER"
}

const SettingImage = ({image,token, team_id,role}: SettingImageProps) => {
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const {toast  } = useToast()      
  const mutation = useMutation<string,AxiosError<IFormattedErrorResponse>, FormData>({
    mutationFn : async (formData) => {
      const {data} = await updateTeamProfile({token:token, formData : formData, team_id:team_id})
        return data;
    },
    onSuccess : () => {
        console.log('success')
        queryClient.invalidateQueries({queryKey : [`team-${team_id}`]})
    },
onError : (error) => {
  console.log(error.response?.data.message)
  toast({title : error.response?.data.message})
}
    
});
  console.log(pathname)
    const [pvimage, setPvImage] = React.useState<string>(image.replaceAll('"',''))
      const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    const formData = new FormData()
    if (selectedFile) {
      // Handle the selected file (e.g., upload to server)
      formData.append("team_poster",selectedFile)
        const reader = new FileReader()
        reader.onloadend = () => {
            setPvImage(reader.result as string)
            }
            reader.readAsDataURL(selectedFile);
        mutation.mutate(formData)
    }
  };
  const handleFileUpload = () => {
    // Trigger the file input click event
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  return (
    <div className="flex w-1/2 gap-8 flex-col items-center">

    <Image src={pvimage} alt="reg-vector" width={0} height={0} sizes="100vw" className="w-[40%] max-h-[300px] self-center" />
    <Button className="" disabled={role === "MEMBER"} onClick={handleFileUpload}>Change</Button>
    <input
        id="fileInput"
        type="file"
        style={{ display: 'none' }}
		    accept=" .jpg, .jpeg, .png"
        onChange={handleFileSelected}
        multiple
      />
    </div>
  )
}

export default SettingImage