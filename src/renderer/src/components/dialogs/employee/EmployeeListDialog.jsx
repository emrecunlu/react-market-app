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
import CircularLoader from '../../common/CircularLoader'
import {
  useGetEmployees,
  useRemoveEmployee,
  useUpdateEmployee
} from '../../../utils/hooks/useEmployeeRepository'
import { DataGrid } from '@mui/x-data-grid'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { FcMinus } from 'react-icons/fc'
import PageLoader from '../../common/PageLoader'
import EmployeeAddDialog from './EmployeeAddDialog'
import ConfirmationDialog from '../ConfirmationDialog'

const EmployeeListDialog = ({ onClose, isOpen }) => {
  const [dialog, setDialog] = useState(false)
  const [selected, setSelected] = useState(null)

  const columns = [
    {
      headerName: 'İsim',
      field: 'firstname',
      flex: 1,
      editable: true
    },
    {
      headerName: 'Soyisim',
      field: 'lastname',
      flex: 1,
      editable: true
    },
    {
      headerName: 'Telefon Numarası',
      field: 'phoneNumber',
      flex: 1,
      editable: true
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

  const { data, isLoading } = useGetEmployees()
  const { mutate: updateEmployee, isLoading: updateLoading } = useUpdateEmployee()
  const { mutate: removeEmployee, isLoading: removeLoading } = useRemoveEmployee()

  const handleRowUpdate = (row) => {
    updateEmployee(row)

    return row
  }

  const handleConfirm = () => {
    removeEmployee(selected.id)
    setSelected(true)
  }

  return (
    <>
      <ConfirmationDialog
        title="Personel Sil"
        description="Personeli silmek istediğinizden emin misiniz?"
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        onConfirm={handleConfirm}
      />
      <EmployeeAddDialog isOpen={dialog} onClose={() => setDialog(false)} />
      <Dialog fullWidth maxWidth="xl" open={isOpen} onClose={onClose}>
        <PageLoader isLoading={updateLoading || removeLoading}>
          <DialogTitle>Personel Listesi</DialogTitle>
          <DialogContent dividers>
            {(isLoading && <CircularLoader />) || (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    endIcon={<AiOutlineUserAdd />}
                    sx={{ mb: 2, ml: 'auto' }}
                    onClick={() => setDialog(true)}
                    size="large"
                    variant="contained"
                  >
                    Personel Ekle
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

export default EmployeeListDialog
