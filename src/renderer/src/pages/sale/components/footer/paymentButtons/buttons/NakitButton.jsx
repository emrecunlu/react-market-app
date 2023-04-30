import React, { useState } from 'react'
import { FcMoneyTransfer } from 'react-icons/fc'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import PageLoader from '../../../../../../components/common/PageLoader'
import { useNewSale } from '../../../../../../utils/hooks/useSaleRepository'
import { PaymentType } from '../../../../../../config/constants'
import { useBasket } from '../../../../../../store/features/basket'
import SaleHelper from '../../../../../../utils/helpers/saleHelper'

const NakitButton = () => {
  const onSuccess = (response) => {
    const { data: result } = response.data

    SaleHelper.succesSale(result)
  }

  const { data: basketItems } = useBasket()
  const { isLoading, mutate: newSale } = useNewSale(onSuccess)

  const handleClick = async () => {
    const personal = await window.api.getStoreValue('personal')

    const requestBody = {
      shiftId: personal.shiftId,
      isVATIncluded: true,
      paymentType: PaymentType.Nakit,
      userId: personal.userId
    }

    const sales = basketItems.map((item) => ({
      stockCode: item.stokKodu,
      stockName: item.stokAdi,
      amount: item.miktar,
      price: item.satisFiat1,
      transfer: false,
      vatGroup: item.kdvOrani.toString()
    }))

    newSale({ ...requestBody, sales })
  }

  return (
    <>
      <PageLoader isLoading={isLoading}>
        <PaymetButton disabled={basketItems.length === 0} onClick={handleClick} icon={<FcMoneyTransfer />}>
          NAKİT
        </PaymetButton>
      </PageLoader>
    </>
  )
}

export default NakitButton
