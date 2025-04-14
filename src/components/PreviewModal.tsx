import { Backdrop, Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { CloudinaryImage } from "./ImageGrid";

type PreviewModalProps = {
  previewOpen: boolean;
  handleClose: () => void;
  selectedImage?: CloudinaryImage | null;
};

function PreviewModal({ previewOpen, handleClose, selectedImage }: PreviewModalProps) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <Image
              src={selectedImage.secure_url}
              alt={selectedImage.public_id}
              height={200}
              width={200}
              style={{ objectFit: "cover", borderRadius: "8px" }}
              quality={100}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default PreviewModal;
