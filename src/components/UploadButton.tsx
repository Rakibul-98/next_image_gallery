"use client";

import { Button } from "@mui/material";
import { useState } from "react";

function UploadButton() {

  const [loading, setLoading] = useState(false);

  const handleUpload = async (files: FileList) => {
    setLoading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        formData.append('timestamp', String(Date.now()));

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        return response.json();
      });

      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.secure_url);
      
      alert(`${files.length} file(s) uploaded successfully!`);
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="contained" component="label" disabled={loading}>
      {loading ? "Uploading..." : "Upload"}
      <input
        hidden
        multiple
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && handleUpload(e.target.files)}
      />
    </Button>
  );
}

export default UploadButton;
