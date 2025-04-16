"use client";

import { Alert, Box, Grid, Snackbar, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PreviewModal from "./PreviewModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import LoadingSkeleton from "./LoadingSkeleton";
import ImageCard from "./ImageCard";
import SearchBar from "./SearchBar";

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
}

function ImageGrid() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasInitialLoad, setHasInitialLoad] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(
    null
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageClick = (image: CloudinaryImage) => {
    setSelectedImage(image);
    setPreviewOpen(true);
  };

  const handleClose = () => {
    setPreviewOpen(false);
    setSelectedImage(null);
  };

  const handleDeleteClick = (public_id: string) => {
    setImageToDelete(public_id);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!imageToDelete || deleting === imageToDelete) return;

    setDeleting(imageToDelete);
    try {
      const response = await fetch("/api/images", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: imageToDelete }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete image");
      }

      const data = await response.json();

      if (data.success) {
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imageToDelete)
        );
        setSnackbar({
          open: true,
          message: "Image deleted successfully",
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: data.error || "Delete failed",
          severity: "error",
        });
        // console.error("Delete failed:", data.error);
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : "Error deleting image",
        severity: "error",
      });
      // console.error("Error deleting image:", err);
    } finally {
      setDeleting(null);
      setImageToDelete(null);
      setOpenDelete(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const url = new URL("/api/images", window.location.origin);
      if (nextCursor) url.searchParams.append("nextCursor", nextCursor);

      if (searchQuery) url.searchParams.append("searchQuery", searchQuery);

      const res = await fetch(url.toString());
      const data = await res.json();

      if (Array.isArray(data.resources)) {
        setImages((prev) => {
          const existingIds = new Set(prev.map((img) => img.public_id));

          const newImages = data.resources.filter(
            (newImage: CloudinaryImage) => !existingIds.has(newImage.public_id)
          );

          return [...prev, ...newImages];
        });

        setNextCursor(data.next_cursor || null);
        setHasMore(!!data.next_cursor);
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error loading images",
        severity: "error",
      });
      console.error("Error loading images:", err);
    } finally {
      setLoading(false);
      if (!hasInitialLoad) setHasInitialLoad(true);
    }
  }, [loading, hasMore, nextCursor, hasInitialLoad, searchQuery]);

  useEffect(() => {
    if (!hasInitialLoad) {
      loadMore();
    }
  }, [hasInitialLoad, loadMore]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          px: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
            color: searchQuery ? "primary.main" : "text.primary",
          }}
        >
          {searchQuery ? `Search results for "${searchQuery}"` : "All Images"}
        </Typography>
        <SearchBar
          search={search}
          setSearch={setSearch}
          setImages={setImages}
          setNextCursor={setNextCursor}
          setHasMore={setHasMore}
          setHasInitialLoad={setHasInitialLoad}
          setSearchQuery={setSearchQuery}
        />
      </Box>

      <InfiniteScroll
        dataLength={images.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<LoadingSkeleton />}
        endMessage={
          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "500",
            }}
          >
            {searchQuery ? (
              <>
                🔍 No more results found for{" "}
                <strong>&quot;{searchQuery}&quot;</strong>
              </>
            ) : (
              <>🎉 You&apos;ve reached the end of the gallery!</>
            )}
          </p>
        }
      >
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {images.map((img, i) => (
            <Box
              key={i}
              sx={{
                height: "200px",
                width: "200px",
                bgcolor: "lightgrey",
                borderRadius: "4px",
              }}
            >
              <ImageCard
                img={img}
                handleDeleteClick={handleDeleteClick}
                handleImageClick={handleImageClick}
              />
            </Box>
          ))}
        </Grid>
      </InfiniteScroll>
      <ConfirmDeleteModal
        openDelete={openDelete}
        handleConfirm={handleDelete}
        deleting={deleting}
        handleClose={() => {
          setOpenDelete(false);
          setImageToDelete(null);
        }}
      />
      <PreviewModal
        selectedImage={selectedImage}
        handleClose={handleClose}
        previewOpen={previewOpen}
      />

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

export default ImageGrid;
