// UploadButton.tsx

import React, { use } from 'react';
import { Button } from '../ui/button';
import { useFileStore } from '@/store/FileStore';
import { randomUUID } from 'crypto';

const UploadButton  = () => {
  const handleFileUpload = () => {
    // Trigger the file input click event
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Handle the selected file (e.g., upload to server)
    for (let i = 0; i < event.target.files!.length; i++) {
      const file = event.target.files![i];
      useFileStore.getState().addFile({
        id: String(100000 * Math.random() * Math.random() * Date.now()),
        name: file.name,
        email: 'email',
        url: 'https://www.google.com/',
        createdAt: 'createdAt',
      });
    }
    }
  };

  return (
    <div>
      <Button onClick={handleFileUpload}>Upload File</Button>
      <input
        id="fileInput"
        type="file"
        style={{ display: 'none' }}
		    accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileSelected}
        multiple
      />
    </div>
  );
};

export default UploadButton;
