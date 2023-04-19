import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  TextField
} from '@mui/material'
import { AiOutlineSave } from 'react-icons/ai'
import PageLoader from '../../common/PageLoader'
import { toast } from 'react-hot-toast'
import { useAddOutgoing } from '../../../utils/hooks/useOutgoingRepository'

const OutgoingAddDialog = ({ isOpen, onClose, onSuccess }) => {
  const [outgoing, setOutgoing] = useState({
    name: '',
    price: 0
  })

  const { isLoading, mutate: addOutgoing } = useAddOutgoing((response) => {
    const { data: result } = response.data

    setOutgoing({ name: '', price: 0 })
    toast.success('Gider başarıyla eklendi.')
    onSuccess(result)
    onClose()
  })

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open={isOpen}>
      <PageLoader isLoading={isLoading}>
        <DialogTitle>Gider Ekle</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} rowSpacing={4}>
            <Grid item md={12}>
              <TextField
                label="Gider İsmi"
                placeholder="Lütfen gider ismini giriniz."
                fullWidth
                value={outgoing.name}
                onChange={(e) => setOutgoing((outgoing) => ({ ...outgoing, name: e.target.value }))}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                label="Fiyat"
                placeholder="Lütfen fiyatını giriniz."
                fullWidth
                value={outgoing.price}
                onChange={(e) =>
                  setOutgoing((outgoing) => ({ ...outgoing, price: e.target.value }))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => addOutgoing(outgoing)}
            disabled={Object.values(outgoing).some((item) => item.length === 0)}
            size="large"
            variant="contained"
            endIcon={<AiOutlineSave />}
          >
            Kaydet
          </Button>
        </DialogActions>
      </PageLoader>
    </Dialog>
  )
}

export default OutgoingAddDialog
