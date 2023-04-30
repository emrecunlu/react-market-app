import React, { useState } from 'react'
import BaseDialog from '../../common/BaseDialog'
import { Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { MdSend } from 'react-icons/md'

const SendMailDialog = ({ onClose, isOpen }) => {
  const [form, setForm] = useState({
    title: '',
    description: ''
  })


  return (
    <BaseDialog maxWidth="md" title="İletişim" isOpen={isOpen} onClose={onClose}>
      <DialogContent dividers>
        <TextField
          label="Başlık"
          value={form.title}
          onChange={(e) => setForm((form) => ({ ...form, title: e.target.value }))}
          placeholder="Lütfen başlık giriniz."
          fullWidth
        />
        <TextField
          multiline
          rows={5}
          value={form.description}
          onChange={(e) => setForm((form) => ({ ...form, description: e.target.value }))}
          label="Açıklama"
          placeholder="Lütfen açıklama giriniz."
          sx={{ mt: 4 }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => window.electron.ipcRenderer.send('send:mail', form)}
          disabled={form.description === ''}
          size="large"
          variant="contained"
          endIcon={<MdSend />}
        >
          Gönder
        </Button>
      </DialogActions>
    </BaseDialog>
  )
}

export default SendMailDialog
