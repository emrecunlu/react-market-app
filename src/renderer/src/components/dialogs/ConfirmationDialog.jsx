import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Button
} from '@mui/material'

const ConfirmationDialog = ({ title, description, onClose, isOpen, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog fullWidth maxWidth="md" open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="large" color="secondary" variant="contained" onClick={onClose}>
          İptal
        </Button>
        <Button size="large" color="error" variant="contained" onClick={handleConfirm}>
          Onayla
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
