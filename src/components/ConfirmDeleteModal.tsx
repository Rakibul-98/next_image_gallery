import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

function ConfirmDeleteModal({ openDelete, 
    handleConfirm, 
    handleClose,
deleting  }) {

  return (
    <Dialog
      open={openDelete}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure to <span>Delete</span> this image?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={deleting} onClick={handleConfirm}>{ deleting ? "Deleting ..." :
        'Confirm'}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
