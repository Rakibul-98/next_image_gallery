"use client"

import { Grid } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

// import CloseIcon from "@mui/icons-material/Close";
import PreviewModal from "./PreviewModal";

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
  const [open, setOpen] = useState(false);

  const handleImageClick = (image: CloudinaryImage) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
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
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>No more images to load</p>
        }
      >
        <Grid container spacing={2}>
          {images.map((img, i) => (
            <Grid key={i}>
              <div
                onClick={() => handleImageClick(img)}
                style={{ position: "relative", height: "300px" }}
              >
                <Image
                  src={img.secure_url}
                  alt={img.public_id}
                  height={200}
                  width={200}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      <PreviewModal selectedImage={selectedImage} handleClose={handleClose} open={open} />

      {/* <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ padding: 0 }}>
          {selectedImage && (
            <div
              style={{ position: "relative", width: "100%", height: "80vh" }}
            >
              <Image
                src={selectedImage.secure_url}
                alt={selectedImage.public_id}
                height={200}
                width={200}
                style={{ objectFit: "cover", borderRadius: "8px" }}
                quality={100}
              />
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </>
  );
}

export default ImageGrid;
