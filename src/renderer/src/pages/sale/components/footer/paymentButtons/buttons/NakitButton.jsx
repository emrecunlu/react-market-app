import React, { useState } from 'react'
import { FcMoneyTransfer } from 'react-icons/fc'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import PageLoader from '../../../../../../components/common/PageLoader'
import { useNewSale } from '../../../../../../utils/hooks/useSaleRepository'
import { PaymentType } from '../../../../../../config/constants'
import { clearAll, useBasket } from '../../../../../../store/features/basket'
import store from '../../../../../../store'
import { toast } from 'react-hot-toast'

const NakitButton = () => {
  const onSuccess = (response) => {
    const { data: result } = response.data

    store.dispatch(clearAll())
    toast.success('Sipariş başarılı!')
  }

  const { data: basketItems } = useBasket()
  const { isLoading, mutate: newSale } = useNewSale(onSuccess)

  const handleClick = async () => {
    const personal = await window.api.getStoreValue('personal')

    const requestBody = {
      shiftId: 1,
      isVATIncluded: true,
      paymentType: PaymentType.Nakit,
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
    <>
      <PageLoader isLoading={isLoading}>
        <PaymetButton onClick={handleClick} icon={<FcMoneyTransfer />}>
          NAKİT
        </PaymetButton>
      </PageLoader>
    </>
  )
}

export default NakitButton
