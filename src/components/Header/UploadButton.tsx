"use client";

import { useState } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function UploadButton() {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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
      setSnackbar({
        open: true,
        message: `${files.length} file${files.length > 1 ? "s" : ""} uploaded successfully!`,
        severity: "success",
      });

      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      // console.error("Upload error:", error);
      setSnackbar({
        open: true,
        message: (error as Error).message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        component="label"
        disabled={loading}
        startIcon={!loading && <CloudUploadIcon />}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Uploading...
          </>
        ) : (
          "Upload"
        )}
        <input
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
        />
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default UploadButton;
