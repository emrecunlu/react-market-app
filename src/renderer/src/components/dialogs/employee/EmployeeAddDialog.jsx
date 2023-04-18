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
import { useAddEmployee } from '../../../utils/hooks/useEmployeeRepository'
import PageLoader from '../../common/PageLoader'
import { toast } from 'react-hot-toast'

const EmployeeAddDialog = ({ isOpen, onClose }) => {
  const [employee, setEmployee] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: ''
  })

  const { isLoading, mutate: addEmployee } = useAddEmployee(() => {
    setEmployee({ firstname: '', lastname: '', phoneNumber: '' })
    toast.success('Personel başarıyla eklendi.')
    onClose()
  })

  return (
    <Dialog fullWidth maxWidth="lg" onClose={onClose} open={isOpen}>
      <PageLoader isLoading={isLoading}>
        <DialogTitle>Personel Ekle</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} rowSpacing={4}>
            <Grid item md={6}>
              <TextField
                label="İsim"
                placeholder="Lütfen personel ismi giriniz."
                fullWidth
                value={employee.firstname}
                onChange={(e) =>
                  setEmployee((employee) => ({ ...employee, firstname: e.target.value }))
                }
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Soyisim"
                placeholder="Lütfen personel soyismi giriniz."
                fullWidth
                value={employee.lastname}
                onChange={(e) =>
                  setEmployee((employee) => ({ ...employee, lastname: e.target.value }))
                }
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                label="Telefon Numarası"
                placeholder="Lütfen telefon numarası giriniz."
                fullWidth
                value={employee.phoneNumber}
                onChange={(e) =>
                  setEmployee((employee) => ({ ...employee, phoneNumber: e.target.value }))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => addEmployee(employee)}
            disabled={Object.values(employee).some((item) => item.length === 0)}
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

export default EmployeeAddDialog
