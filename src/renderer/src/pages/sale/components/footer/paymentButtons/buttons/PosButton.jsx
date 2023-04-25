import React from 'react'
import { FcDonate } from 'react-icons/fc'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import { useNewSale } from '../../../../../../utils/hooks/useSaleRepository'
import PageLoader from '../../../../../../components/common/PageLoader'
import { PaymentType } from '../../../../../../config/constants'
import { useBasket, clearAll } from '../../../../../../store/features/basket'
import SaleHelper from '../../../../../../utils/helpers/saleHelper'

const PosButton = () => {
  const onSuccess = (response) => {
    const { data: result } = response.data

   /*  SaleHelper.succesSale(result); */
  }

  const { mutate: newSale, isLoading } = useNewSale(onSuccess)

  const { data: basketItems } = useBasket()

  const handleClick = async () => {
    const personal = await window.api.getStoreValue('personal')

    const requestBody = {
      shiftId: personal.shiftId,
      isVATIncluded: true,
      paymentType: PaymentType.Pos,
      userId: personal.userId
    }

    const sales = basketItems.map((item) => ({
      stockCode: item.stokKodu,
      stockName: item.stokAdi,
      amount: item.miktar,
      price: item.satisFiat1,
      transfer: true,
      vatGroup: item.kdvOrani.toString()
    }))

    newSale({ ...requestBody, sales })
  }

  return (
    <PageLoader isLoading={isLoading}>
      <PaymetButton icon={<FcDonate />} onClick={handleClick}>
        POS
      </PaymetButton>
    </PageLoader>
  )
}

export default PosButton
