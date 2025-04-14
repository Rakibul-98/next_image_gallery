import { Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";

type ConfirmDeleteModalProps = {
    openDelete: boolean;
    handleConfirm: () => void;
    handleClose: () => void;
    deleting: string | null;
  }

function ConfirmDeleteModal({ openDelete,  handleConfirm, handleClose, deleting} : ConfirmDeleteModalProps) {
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
        <Button disabled={!!deleting} onClick={handleConfirm}>{ deleting ? "Deleting ..." :
        'Confirm'}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
