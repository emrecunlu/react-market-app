import React, { useState } from 'react'
import BaseDialog from '../../common/BaseDialog'
import { Box, Button, DialogContent } from '@mui/material'
import { useGetSaleEndDay } from '../../../utils/hooks/useSaleRepository'
import { MdDescription } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid'
import CircularLoader from '../../../components/common/CircularLoader'
import ReportDetailDialog from './ReportDetailDialog'
import ReportHelper from '../../../utils/helpers/reportHelper'
import SaleHelper from '../../../utils/helpers/saleHelper'
import moment from 'moment/moment'

const ReportListDialog = ({ isOpen, onClose }) => {
  const [dialog, setDialog] = useState(false)

  const { data, isLoading } = useGetSaleEndDay()

  const columns = [
    {
      headerName: 'Ürün İsmi',
      field: 'stockName',
      flex: 2
    },
    {
      headerName: 'Ödeme',
      field: 'paymentType',
      valueGetter: ({ value }) => ReportHelper.getPaymentName(value),
      flex: 1
    },
    {
      headerName: 'Kdv',
      field: 'vatGroup',
      valueGetter: ({ value }) => `${value}%`,
      flex: 1
    },
    {
      headerName: 'Miktar',
      field: 'amount',
      valueGetter: ({ value }) => SaleHelper.toMoneyFormat(value),
      flex: 1
    },
    {
      headerName: 'Tutar',
      field: 'price',
      valueGetter: ({ value }) => SaleHelper.toMoneyFormat(value),
      flex: 1
    },
    {
      headerName: 'Toplam',
      field: "totalPrice",
      renderCell: ({ row }) => SaleHelper.toMoneyFormat(row.price * row.amount),
      flex: 1
    },
    {
      headerName: 'Tarih',
      field: 'createdAt',
      valueGetter: ({ value }) => moment(value).format('YYYY-MM-DD hh:mm:ss'),
      flex: 1
    }
  ]

  return (
    <>
      {!isLoading && <ReportDetailDialog data={data} isOpen={dialog} onClose={() => setDialog(false)} />}
      <BaseDialog title="Personel Satış Rapor" isOpen={isOpen} onClose={onClose}>
        <DialogContent dividers>
          {(isLoading && <CircularLoader />) || (
            <>
              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Button
                  onClick={() => setDialog(true)}
                  endIcon={<MdDescription />}
                  size="large"
                  variant="contained"
                >
                  Detayları Görüntüle
                </Button>
              </Box>
              <DataGrid getRowId={(row) => row.id} rows={data?.sales ?? []} columns={columns} autoHeight />
            </>
          )}
        </DialogContent>
      </BaseDialog>
    </>
  )
}

export default ReportListDialog
