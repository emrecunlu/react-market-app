import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import { set as setBasketItem, setSelecteds, useBasket } from '../../../../store/features/basket'
import { DataGrid } from '@mui/x-data-grid'
import SaleHelper from '../../../../utils/helpers/saleHelper'
import store from '../../../../store'

const BasketList = () => {
  const { data: basketLists, selecteds } = useBasket()

  const columns = [
    {
      field: 'stokAdi',
      headerName: 'Ürün İsmi',
      flex: 2
    },
    {
      field: 'miktar',
      headerName: 'Miktar',
      editable: true,
      valueSetter: ({ value, row }) => {
        if (isNaN(value) || value === '') return row

        return { ...row, miktar: parseInt(value), toplamFiat: row.satisFiat1 * parseInt(value) }
      },
      flex: 1
    },
    {
      field: 'kdvOrani',
      headerName: 'Kdv Oranı',
      valueFormatter: ({ value }) => `${value}%`,
      flex: 1
    },
    {
      field: 'satisFiat1',
      headerName: 'Birim Fiyat',
      editable: true,
      valueFormatter: ({ value }) => SaleHelper.toMoneyFormat(value),
      valueSetter: ({ value, row }) => {
        if (isNaN(value) || value === '') return row

        return { ...row, satisFiat1: parseFloat(value), toplamFiat: parseFloat(value) * row.miktar }
      },
      flex: 1
    },
    {
      field: 'toplamFiat',
      headerName: 'Toplam Fiyat',
      valueFormatter: ({ value }) => SaleHelper.toMoneyFormat(value),
      flex: 1
    }
  ]

  const reversedData = useMemo(() => {
    return [...basketLists].reverse()
  }, [basketLists])

  const handleCellEditStop = (params) => {
    store.dispatch(setBasketItem(params))

    return params
  }

  const handleRowSelectionModelChange = (params) => {
    store.dispatch(setSelecteds(params))
  }

  return (
    <Box sx={{ flex: 1 }}>
      {basketLists.length > 0 && (
        <DataGrid
          processRowUpdate={handleCellEditStop}
          hideFooterPagination={true}
          columns={columns}
          rows={reversedData}
          checkboxSelection
          rowSelectionModel={selecteds}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          getRowId={(row) => row?.stokKodu}
        />
      )}
    </Box>
  )
}

export default BasketList
