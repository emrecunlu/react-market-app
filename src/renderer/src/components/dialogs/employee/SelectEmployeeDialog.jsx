import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import { useGetEmployees } from '../../../utils/hooks/useEmployeeRepository'
import { DataGrid } from '@mui/x-data-grid'
import PageLoader from '../../common/PageLoader'
import ConfirmationDialog from '../../../components/dialogs/ConfirmationDialog'

const SelectEmployeeDialog = ({ isOpen, onClose, onSelected }) => {
  const [selected, setSelected] = useState(null)

  const { data, isLoading } = useGetEmployees()

  const columns = [
    {
      headerName: 'Personel İsmi',
      field: 'firstname',
      flex: 1,
      valueGetter: ({ row }) => `${row.firstname} ${row.lastname}`
    },
    {
      headerName: 'Telefon Numarası',
      field: 'phoneNumber',
      flex: 1
    }
  ]

  return (
    <>
      <ConfirmationDialog
        isOpen={selected !== null}
        title="Personel Gider Harcaması"
        description="Personel gider harcamasını onaylıyor musunuz?"
        onClose={() => setSelected(null)}
        onConfirm={() => onSelected(selected)}
      />
      <Dialog fullWidth maxWidth="xl" onClose={onClose} open={isOpen}>
        <DialogTitle>Personel Listesi</DialogTitle>
        <DialogContent dividers>
          {(isLoading && <PageLoader />) || (
            <DataGrid
              autoHeight
              columns={columns}
              rows={data ?? []}
              onRowClick={(params) => setSelected(params.row)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SelectEmployeeDialog
