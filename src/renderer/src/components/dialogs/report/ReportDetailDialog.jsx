import React from 'react'
import BaseDialog from '../../common/BaseDialog'
import { DialogContent, Grid, TextField } from '@mui/material'
import SaleHelper from '../../../utils/helpers/saleHelper'

const ReportDetailDialog = ({ isOpen, onClose, data }) => {
  return (
    <BaseDialog title="Satış Detayları" onClose={onClose} isOpen={isOpen} maxWidth="md">
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <TextField
              label="Gelir"
              disabled
              fullWidth
              defaultValue={SaleHelper.toMoneyFormat(data.gelir)}
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              label="Veresiye"
              disabled
              fullWidth
              defaultValue={SaleHelper.toMoneyFormat(data.veresiye)}
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              label="Personel Gider"
              disabled
              fullWidth
              defaultValue={SaleHelper.toMoneyFormat(data.personelGider)}
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              label="Müşteri Gider"
              disabled
              fullWidth
              defaultValue={SaleHelper.toMoneyFormat(data.musteriGider)}
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              label="Y.Kasa Nakit"
              disabled
              fullWidth
              defaultValue={SaleHelper.toMoneyFormat(data.yKasaNakit)}
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              label="Y.Kasa Pos"
              disabled
              fullWidth
              defaultValue={SaleHelper.toMoneyFormat(data.yKasaPos)}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label="Toplam"
              disabled
              fullWidth
              defaultValue={SaleHelper.toMoneyFormat(data.toplam)}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </BaseDialog>
  )
}

export default ReportDetailDialog
