import {
  Backdrop,
  Box,
  IconButton,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { CloudinaryImage } from "./ImageGrid";

type PreviewModalProps = {
  previewOpen: boolean;
  handleClose: () => void;
  selectedImage?: CloudinaryImage | null;
};

function PreviewModal({
  previewOpen,
  handleClose,
  selectedImage,
}: PreviewModalProps) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    maxWidth: 700,
    bgcolor: "background.paper",
    borderRadius: 2,
    overflow: "hidden",
  };

  return (
    <Modal
      open={previewOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size="small"
          sx={{
            position: "absolute",
            right: 2,
            top: 2,
            zIndex: 2,
            color: "red",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "rgb(255, 210, 210)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {selectedImage && (
          <Image
            src={selectedImage.secure_url}
            alt={selectedImage.public_id}
            fill
            style={{
              objectFit: "cover",
            }}
            quality={100}
          />
        )}
      </Box>
    </Modal>
  );
}

export default PreviewModal;
