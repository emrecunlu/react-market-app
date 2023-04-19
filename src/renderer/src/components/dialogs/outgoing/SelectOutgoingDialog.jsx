import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Box,
  DialogActions
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PageLoader from '../../common/PageLoader'
import ConfirmationDialog from '../../../components/dialogs/ConfirmationDialog'
import { useGetOutgoings } from '../../../utils/hooks/useOutgoingRepository'
import SaleHelper from '../../../utils/helpers/saleHelper'
import { AiOutlineCheck } from 'react-icons/ai'

const SelectOutgoingDialog = ({ isOpen, onClose, onConfirm }) => {
  const [dialog, setDialog] = useState(false)
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
        onClose={() => setDialog(null)}
        onConfirm={() => onConfirm(selected)}
      />
      <Dialog fullWidth maxWidth="xl" onClose={onClose} open={isOpen}>
        <DialogTitle>Personel Listesi</DialogTitle>
        {JSON.stringify(selected)}
        <DialogContent dividers>
          {(isLoading && <PageLoader />) || (
            <DataGrid
              processRowUpdate={handleRowUpdate}
              autoHeight
              columns={columns}
              rows={data ?? []}
              onRowClick={(params) => setSelected(params.row)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialog(true)}
            disabled={selected === null}
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
