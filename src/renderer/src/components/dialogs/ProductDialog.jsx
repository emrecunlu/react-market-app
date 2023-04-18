import React, { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  InputAdornment
} from '@mui/material'
import { FcSearch } from 'react-icons/fc'
import { useGetStocks } from '../../utils/hooks/useStockRepository'
import { DataGrid } from '@mui/x-data-grid'
import CircularLoader from '../common/CircularLoader'
import {
  add as addBasketItem,
  increment as incrementBasketItem,
  useBasket
} from '../../store/features/basket'
import store from '../../store'
import { toast } from 'react-hot-toast'

const ProductDialog = ({ onClose, isOpen }) => {
  const [search, setSearch] = useState('')

  const { data: stocks, isLoading } = useGetStocks(search)

  const { data: basketLists } = useBasket()

  const columns = [
    {
      field: 'stokKodu',
      headerName: 'Stok Kodu',
      flex: 1
    },
    {
      field: 'stokAdi',
      headerName: 'Stok Adı',
      flex: 1
    },
    {
      field: 'satisFiat1',
      headerName: 'Fiyat',
      flex: 1
    }
  ]

  const handleRowClick = (params) => {
    const { row } = params

    if (basketLists.find((item) => item.stokKodu === row.stokKodu)) {
      store.dispatch(incrementBasketItem(row.stokKodu))
    } else {
      store.dispatch(addBasketItem({ ...row, miktar: 1, toplamFiat: row.satisFiat1 }))
    }

    toast.success('Ürün eklendi')
  }

  return (
    <Dialog onClose={onClose} fullWidth maxWidth="xl" open={isOpen}>
      <DialogTitle>Ürün Listesi</DialogTitle>
      <DialogContent dividers>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FcSearch size={23} />
              </InputAdornment>
            )
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          label="Arama"
          placeholder="Aramak istediğiniz ürünü giriniz."
        />
        <Box sx={{ my: 4 }}>
          {(isLoading && <CircularLoader />) || (
            <DataGrid
              autoHeight
              columns={columns}
              rows={stocks ?? []}
              getRowId={(row) => row?.stokKodu}
              onRowClick={handleRowClick}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDialog
