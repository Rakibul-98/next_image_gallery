"use client";

import { Button } from "@mui/material";
import {useState } from "react";

function UploadButton() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (files: FileList) => {
    setLoading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/images", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Upload failed");
        }

        return response.json();
      });

      await Promise.all(uploadPromises);
      alert(`${files.length} file(s) uploaded successfully!`);
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
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
