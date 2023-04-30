import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  TextField,
  Chip
} from '@mui/material'
import { AiOutlineSave } from 'react-icons/ai'
import { useSettings } from '../../../store/features/settings'
import SettingsHelper from '../../../utils/helpers/settingsHelper'
import { toast } from 'react-hot-toast'
import BaseDialog from '../../common/BaseDialog'

const SettingsDialog = ({ isOpen, onClose }) => {
  const { settings } = useSettings()

  const [data, setData] = useState({
    printerName: settings.printerName,
    serverAddress: settings.serverAddress,
    localAddress: settings.localAddress,
    vatIncluded: settings.vatIncluded
  })

  const handleClick = () => {
    SettingsHelper.setSettings(data)

    toast.success('Ayarlar güncellendi')

    onClose()
  }

  return (
    <BaseDialog title="Ayarlar" onClose={onClose} isOpen={isOpen}>
      <DialogContent dividers>
        <Grid container spacing={2} rowSpacing={4}>
          <Grid item md={6}>
            <TextField
              value={data.serverAddress}
              onChange={(e) => setData({ ...data, serverAddress: e.target.value })}
              fullWidth
              label="Server Adresi"
              placeholder="Lütfen server adresi giriniz."
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              value={data.localAddress}
              onChange={(e) => setData({ ...data, localAddress: e.target.value })}
              fullWidth
              label="Local Adres"
              placeholder="Lütfen local adres ismi giriniz."
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              value={data.printerName}
              onChange={(e) => setData({ ...data, printerName: e.target.value })}
              fullWidth
              label="Yazıcı İsmi"
              placeholder="Lütfen yazıcı ismi giriniz."
            />
          </Grid>
          <Grid md={6} item>
            <Button
              size="large"
              onClick={() => setData({ ...data, vatIncluded: !data.vatIncluded })}
              variant={data.vatIncluded ? 'contained' : 'outlined'}
            >
              KDV Dahil ({data.vatIncluded ? 'Aktif' : 'Pasif'})
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} size="large" variant="contained" endIcon={<AiOutlineSave />}>
          Kaydet
        </Button>
      </DialogActions>
    </BaseDialog>
  )
}

export default SettingsDialog
