import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

type ConfirmDeleteModalProps = {
  openDelete: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
  deleting: string | null;
};

function ConfirmDeleteModal({
  openDelete,
  handleConfirm,
  handleClose,
  deleting,
}: ConfirmDeleteModalProps) {
  return (
    <Dialog open={openDelete} keepMounted onClose={handleClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure to <span>Delete</span> this image?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" sx={{ px: 1.5 }}>
          {" "}
          Cancel
        </Button>
        <Button
          disabled={!!deleting}
          onClick={handleConfirm}
          variant="contained"
          sx={{ px: 1.5 }}
        >
          {deleting ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={15} color="inherit" />
              Deleting...
            </Box>
          ) : (
            "Confirm"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
