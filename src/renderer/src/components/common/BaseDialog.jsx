import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material'
import { MdClose } from 'react-icons/md'

const BaseDialog = ({ children, title, isOpen, onClose, maxWidth = 'xl' }) => {
  return (
    <Dialog open={isOpen} fullWidth maxWidth={maxWidth} onClose={onClose}>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box flexGrow={1}>
            <Typography variant="h6">{title}</Typography>
          </Box>
          <IconButton onClick={onClose}>
            <MdClose size={28} />
          </IconButton>
        </Box>
      </DialogTitle>
      {children}
    </Dialog>
  )
}

export default BaseDialog
