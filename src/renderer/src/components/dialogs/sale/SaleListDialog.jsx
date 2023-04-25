import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useGetSales } from '../../../utils/hooks/useSaleRepository'
import moment from 'moment/moment'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DataGrid } from '@mui/x-data-grid'

const SaleListDialog = ({ isOpen, onClose }) => {
  const { mutate, isLoading, data } = useGetSales()

  const getSales = async (date) => {
    const personal = await window.api.getStoreValue('personal')

    mutate({ date: moment(date).format('YYYY-MM-DD'), userId: personal.userId })
  }

  useEffect(() => {
    getSales()
  }, [])

  const columns = [
    {
      
    }
  ]

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Dialog fullWidth maxWidth="xl" onClose={onClose} open={isOpen}>
        <DialogTitle>Satış Listesi</DialogTitle>
        <DialogContent dividers>
          {JSON.stringify(data)}
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  )
}

export default SaleListDialog
