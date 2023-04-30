import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import React from 'react'
import BaseDialog from '../../common/BaseDialog'

const OutgoingDescriptionDialog = ({ isOpen, onClose }) => {
  return (
    <BaseDialog title="Açıklama" isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogContentText>Gider hakkında bir açıklama giriniz.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Satış Yap</Button>
      </DialogActions>
    </BaseDialog>
  )
}

export default OutgoingDescriptionDialog
