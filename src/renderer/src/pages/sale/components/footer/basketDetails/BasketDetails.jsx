import React, { useMemo } from 'react'
import { Box, Paper, Stack, Typography, Button, Divider } from '@mui/material'
import { clearAll, removeSelecteds, useBasket } from '../../../../../store/features/basket'
import store from '../../../../../store'
import SaleHelper from '../../../../../utils/helpers/saleHelper'
import { red } from '@mui/material/colors'

const BasketDetails = () => {
  const { data: basketItems, selecteds } = useBasket()

  const totalPrice = useMemo(() => {
    return basketItems.reduce((prev, item) => prev + item.toplamFiat, 0)
  }, [basketItems])

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Button
          onClick={() => store.dispatch(clearAll())}
          disabled={basketItems.length === 0}
          variant="contained"
        >
          Tümünü Sil
        </Button>
        <Button
          sx={{ ml: 2 }}
          onClick={() => store.dispatch(removeSelecteds())}
          disabled={selecteds.length === 0}
          variant="contained"
        >
          Seçilenleri Sil
        </Button>
      </Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2">Toplam Miktar:</Typography>
          <Box sx={{ pr: 2, py: 1, pl: 8, bgcolor: red['A700'] }} component={Paper}>
            <Typography color="white" textAlign="right" variant="h6">
              {SaleHelper.toMoneyFormat(totalPrice)}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default BasketDetails
