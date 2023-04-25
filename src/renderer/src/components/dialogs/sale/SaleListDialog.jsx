import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

const SaleListDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog fullWidth maxWidth="xl" onClose={onClose} open={isOpen}>
      <DialogTitle>Satış Listesi</DialogTitle>
      <DialogContent dividers>
      </DialogContent>
    </Dialog>
  )
}

export default SaleListDialog
