"use client"
import React from 'react'
import {Button} from "@/components/ui/button"
import Image from "next/image";

type SettingImageProps = {
    image : string
}

const SettingImage = ({image}: SettingImageProps) => {
    const [pvimage, setPvImage] = React.useState<string>(image.replaceAll('"',''))
      const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Handle the selected file (e.g., upload to server)
        const reader = new FileReader()
        reader.onloadend = () => {
            setPvImage(reader.result as string)
            }
            reader.readAsDataURL(selectedFile);
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
    <Button className="" onClick={handleFileUpload}>Change</Button>
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