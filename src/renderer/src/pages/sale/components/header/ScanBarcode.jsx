import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AiOutlineBarcode } from 'react-icons/ai'
import PageLoader from '../../../../components/common/PageLoader'
import { useGetStock } from '../../../../utils/hooks/useStockRepository'
import {
  add as addBasketItem,
  incrementByAmount as ibaBasketItem,
  useBasket
} from '../../../../store/features/basket'
import store from '../../../../store'

const ScanBarcode = () => {
  const [value, setValue] = useState('')
  const [amount, setAmount] = useState(1)

  const { data: basketLists } = useBasket()

  const onSuccess = (response) => {
    const { data: result } = response.data

    if (basketLists.find((item) => item.stokKodu === result.stokKodu)) {
      store.dispatch(ibaBasketItem({ stockCode: result.stokKodu, amount: parseInt(amount) }))
    } else {
      store.dispatch(
        addBasketItem({
          ...result,
          miktar: parseInt(amount),
          toplamFiat: result.satisFiat1 * parseInt(amount)
        })
      )
    }
  }

  const { isLoading, mutate: getStock } = useGetStock(onSuccess)

  const addStock = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      getStock(value)

      setValue('')
    }
  }

  return (
    <PageLoader isLoading={isLoading}>
      <Stack sx={{ flex: 1 }} direction="row" spacing={2} alignItems="center">
        <TextField
          type="number"
          onChange={(e) => setAmount(parseInt(e.target.value))}
          sx={{ maxWidth: 100 }}
          InputProps={{ inputProps: { min: 1 } }}
          label="Miktar"
          value={amount}
        />
        <Typography variant="h6">X</Typography>
        <TextField
          label="Barkod Numarası"
          placeholder="Lütfen barkod numarası giriniz."
          onKeyUp={addStock}
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AiOutlineBarcode size={38} />
              </InputAdornment>
            )
          }}
        />
      </Stack>
    </PageLoader>
  )
}

export default ScanBarcode
