import { IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CloudinaryImage } from "./ImageGrid";

type ImageCardProps = {
    handleDeleteClick: (image: string) => void;
    handleImageClick: (public_id: CloudinaryImage) => void;
    img: CloudinaryImage;
  }

function ImageCard({ handleDeleteClick, handleImageClick, img } : ImageCardProps) {
  return (
    <div style={{ position: "relative" }}>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => handleDeleteClick(img.public_id)}
        sx={{
          position: "absolute",
          right: 2,
          top: 2,
          color: "red",
          border: "rgb(253, 201, 201) 1px solid",
          background: "white",
          "&:hover": {
            background: "rgb(253, 201, 201)",
          },
        }}
      >
        <DeleteForeverIcon fontSize="small" />
      </IconButton>
      <Image
        src={img.secure_url}
        alt={img.public_id}
        onClick={() => handleImageClick(img)}
        height={200}
        width={200}
        style={{
          objectFit: "cover",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default ImageCard;
