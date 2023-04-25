import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import React from 'react'

const OutgoingDescriptionDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Açıklama</DialogTitle>
      <DialogContent>
        <DialogContentText>Gider hakkında bir açıklama giriniz.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Satış Yap</Button>
      </DialogActions>
    </Dialog>
  )
}

export default OutgoingDescriptionDialog
