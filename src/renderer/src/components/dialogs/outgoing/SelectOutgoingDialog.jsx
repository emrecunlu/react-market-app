import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Box,
  DialogActions,
  TextField,
  Divider
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PageLoader from '../../common/PageLoader'
import ConfirmationDialog from '../../../components/dialogs/ConfirmationDialog'
import { useGetOutgoings } from '../../../utils/hooks/useOutgoingRepository'
import SaleHelper from '../../../utils/helpers/saleHelper'
import { AiOutlineCheck } from 'react-icons/ai'

const SelectOutgoingDialog = ({ isOpen, onClose, onConfirm }) => {
  const [dialog, setDialog] = useState(false)
  const [description, setDescription] = useState('')
  const [selected, setSelected] = useState(null)

  const { data, isLoading } = useGetOutgoings()

  const columns = [
    {
      headerName: 'Gider İsmi',
      field: 'name',
      flex: 1
    },
    {
      headerName: 'Fiyat',
      field: 'price',
      flex: 1,
      editable: true,
      valueFormatter: ({ value }) => SaleHelper.toMoneyFormat(value)
    }
  ]

  const handleRowUpdate = (row) => {
    setSelected({ ...row, price: parseFloat(row.price) })

    return { ...row, price: parseFloat(row.price) }
  }

  return (
    <>
      <ConfirmationDialog
        isOpen={dialog}
        title="Müşteri Gider Harcaması"
        description="Müşteri gider harcamasını onaylıyor musunuz?"
        onClose={() => setDialog(false)}
        onConfirm={() => onConfirm({ ...selected, description })}
      />
      <Dialog fullWidth maxWidth="xl" onClose={onClose} open={isOpen}>
        <DialogTitle>Gider Listesi</DialogTitle>
        <DialogContent dividers>
          {(isLoading && <PageLoader />) || (
            <>
              {selected && (
                <TextField
                  fullWidth
                  multiline
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  rows={5}
                  label="Açıklama"
                  placeholder="Lütfen açıklama giriniz."
                />
              )}
              <Divider sx={{ my: 4 }} />
              <DataGrid
                processRowUpdate={handleRowUpdate}
                autoHeight
                columns={columns}
                rows={data ?? []}
                onRowClick={(params) => setSelected(params.row)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialog(true)}
            disabled={selected === null || description === ''}
            size="large"
            variant="contained"
            endIcon={<AiOutlineCheck />}
          >
            Satış Yap
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SelectOutgoingDialog
