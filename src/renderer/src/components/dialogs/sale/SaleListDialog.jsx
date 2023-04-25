import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import moment from 'moment/moment'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DataGrid } from '@mui/x-data-grid'
import { useGetSales } from '../../../utils/hooks/useSaleRepository'
import SaleHelper from '../../../utils/helpers/saleHelper'
import CircularLoader from '../../common/CircularLoader'

const SaleListDialog = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(moment())
  const [debouncedValue, setDebouncedValue] = useState(moment())

  const { data, isLoading, refetch } = useGetSales(debouncedValue.format('YYYY-MM-DD hh:mm:ss'))

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(selectedDate)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [selectedDate])

  const columns = [
    {
      field: 'stockName',
      headerName: 'Ürün İsim',
      flex: 2
    },
    {
      field: 'payment',
      headerName: 'Ödeme Türü',
      flex: 1
    },
    {
      field: 'amount',
      headerName: 'Miktar',
      flex: 1
    },
    {
      field: 'totalPrice',
      headerName: 'Toplam Fiyat',
      valueGetter: ({ row }) => {
        return SaleHelper.toMoneyFormat(row.price * row.amount)
      }
    },
    {
      field: 'price',
      headerName: 'Fiyat',
      flex: 1,
      valueFormatter: ({ value }) => {
        return SaleHelper.toMoneyFormat(value)
      }
    },
    {
      field: 'createdAt',
      headerName: 'Tarih',
      flex: 1,
      valueFormatter: ({ value }) => {
        return moment(value).format('YYYY-MM-DD hh:mm:ss')
      }
    }
  ]

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Dialog fullWidth maxWidth="xl" onClose={onClose} open={isOpen}>
        <DialogTitle>Satış Listesi</DialogTitle>
        <DialogContent dividers>
          <DateTimePicker
            value={selectedDate}
            onChange={(value) => setSelectedDate(value)}
            maxDate={moment()}
            sx={{ width: '100%', mb: 4 }}
            fullWidth
            label="Tarih"
            ampm={false}
          />
          {(isLoading && <CircularLoader />) || (
            <DataGrid autoHeight columns={columns} rows={data ?? []} />
          )}
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  )
}

export default SaleListDialog
