"use client";

import { Grid } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PreviewModal from "./PreviewModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import LoadingSkeleton from "./LoadingSkeleton";
import ImageCard from "./ImageCard";

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
      } else {
        console.error("Delete failed:", data.error);
      }
    } catch (err) {
      console.error("Error deleting image:", err);
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
      console.error("Error loading images:", err);
    } finally {
      setLoading(false);
      if (!hasInitialLoad) setHasInitialLoad(true);
    }
  }, [loading, hasMore, nextCursor, hasInitialLoad]);

  useEffect(() => {
    if (!hasInitialLoad) {
      loadMore();
    }
  }, [hasInitialLoad, loadMore]);

  return (
    <>
      <InfiniteScroll
        dataLength={images.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <LoadingSkeleton/>
        }
        endMessage={
          <p style={{ textAlign: "center", marginTop:"20px" }}>You have reached to the end !!</p>
        }
      >
        <Grid container spacing={2} sx={{ justifyContent: "space-evenly" }}>
          {images.map((img, i) => (
            <ImageCard key={i} img={img} handleDeleteClick={handleDeleteClick} handleImageClick={handleImageClick} />
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
    </>
  );
}

export default ImageGrid;
