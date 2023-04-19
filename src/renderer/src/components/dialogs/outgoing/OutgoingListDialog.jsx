import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  IconButton,
  Box
} from '@mui/material'
import {
  useGetOutgoings,
  useRemoveOutgoing,
  useUpdateOutgoing
} from '../../../utils/hooks/useOutgoingRepository'
import PageLoader from '../../common/PageLoader'
import CircularLoader from '../../common/CircularLoader'
import { DataGrid } from '@mui/x-data-grid'
import { TbScriptPlus } from 'react-icons/tb'
import OutgoingAddDialog from './OutgoingAddDialog'
import SaleHelper from '../../../utils/helpers/saleHelper'
import { toast } from 'react-hot-toast'
import ConfirmationDialog from '../../dialogs/ConfirmationDialog'
import { FcMinus } from 'react-icons/fc'

const OutgoingListDialog = ({ onClose, isOpen }) => {
  const [dialog, setDialog] = useState(false)
  const [selected, setSelected] = useState(null)

  const columns = [
    {
      headerName: 'İsim',
      field: 'name',
      flex: 1,
      editable: true
    },
    {
      headerName: 'Fiyat',
      field: 'price',
      flex: 1,
      editable: true,
      valueFormatter: ({ value }) => SaleHelper.toMoneyFormat(value)
    },
    {
      headerName: 'Sil',
      field: 'delete',
      width: 100,
      align: 'left',
      renderCell: ({ row }) => (
        <IconButton onClick={() => setSelected(row)}>
          <FcMinus />
        </IconButton>
      )
    }
  ]

  const { mutate: updateOutgoing, isLoading: updateLoading } = useUpdateOutgoing(() => {
    toast.success('Gider güncellendi.')
  })

  const { mutate: removeOutgoing, isLoading: removeLoading } = useRemoveOutgoing(() => {
    toast.success('Gider silindi.')

    refetch()
  })

  const handleConfirm = () => {
    removeOutgoing(selected.id)
    setSelected(true)

    refetch()
  }

  const handleRowUpdate = (row) => {
    updateOutgoing(row)

    return { ...row, price: SaleHelper.toMoneyFormat(parseFloat(row.price)) }
  }

  const { data, isLoading, refetch } = useGetOutgoings()

  return (
    <>
      <ConfirmationDialog
        title="Gider Sil"
        description="Gideri silmek istediğinizden emin misiniz?"
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        onConfirm={handleConfirm}
      />
      <OutgoingAddDialog
        isOpen={dialog}
        onSuccess={() => refetch()}
        onClose={() => setDialog(false)}
      />
      <Dialog fullWidth maxWidth="xl" open={isOpen} onClose={onClose}>
        <PageLoader isLoading={updateLoading || removeLoading}>
          <DialogTitle>Gider Listesi</DialogTitle>
          <DialogContent dividers>
            {(isLoading && <CircularLoader />) || (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    endIcon={<TbScriptPlus />}
                    sx={{ mb: 2, ml: 'auto' }}
                    onClick={() => setDialog(true)}
                    size="large"
                    variant="contained"
                  >
                    Gider Ekle
                  </Button>
                </Box>
                <DataGrid
                  processRowUpdate={handleRowUpdate}
                  autoHeight
                  columns={columns}
                  rows={data ?? []}
                />
              </>
            )}
          </DialogContent>
        </PageLoader>
      </Dialog>
    </>
  )
}

export default OutgoingListDialog
