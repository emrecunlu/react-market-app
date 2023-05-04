import React, { useEffect, useState } from 'react'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import { FcDonate, FcSelfServiceKiosk } from 'react-icons/fc'
import { PaymentType, ReportType } from '../../../../../../config/constants'
import { toast } from 'react-hot-toast'
import { useNewSale } from '../../../../../../utils/hooks/useSaleRepository'
import { clearAll, useBasket } from '../../../../../../store/features/basket'
import SaleHelper from '../../../../../../utils/helpers/saleHelper'
import PageLoader from '../../../../../../components/common/PageLoader'
import { Dialog } from '@mui/material'
import store from '../../../../../../store'
import { useSocket } from '../../../../../../context/SocketProvider'

const YazarKasaButtons = () => {
  const [payment, setPayment] = useState({
    payment: null,
    paymentType: null,
    reportType: null
  })

  const { socket, error } = useSocket()
  const { data: basketItems } = useBasket()

  const onSuccess = (response) => {
    const { data: result } = response.data

    toast.success('Sipariş başarılı!')
    store.dispatch(clearAll())

    // eğer satış başarılı ise yazarkasa bağlantısını bitir.
    const Data = {
      SlipCopy: false,
      ReportType: ReportType.Disconnect,
      Data: []
    }

    socket?.send(JSON.stringify(Data))

    setError(true)
  }

  useEffect(() => {
    if (socket !== null) {
      socket.addEventListener('message', async (data) => {
        const response = JSON.parse(data.data)
        if (response?.status === 223) {
          const personal = await window.api.getStoreValue('personal')

          const requestBody = {
            shiftId: personal.shiftId,
            isVATIncluded: true,
            paymentType: payment.paymentType,
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
      })
    }
  }, [])

  const { mutate: newSale, isLoading } = useNewSale(onSuccess)

  const handleClick = async (paymentType) => {
    setPayment({
      payment: paymentType === PaymentType.Yazarkasa ? -1 : 0,
      paymentType
    })

    window.api.addLog('info', 'Yazarkasa fişi cihaza gönderiliyor: ' + JSON.stringify(Data))

    const Data = {
      Payment: payment.payment,
      SlipCopy: true,
      Data: basketItems.map((item) => ({
        DeptId: SaleHelper.getDeptId(item.kdvOrani),
        Amount: item.miktar,
        Price: item.satisFiat1,
        Name: item.stokAdi
      }))
    }

    socket?.send(JSON.stringify(Data))

    /* const personal = await window.api.getStoreValue('personal')

    const requestBody = {
      shiftId: personal.shiftId,
      isVATIncluded: true,
      paymentType: paymentType,
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

    newSale({ ...requestBody, sales }) */
  }

  return (
    <>
      {error}
      <Dialog open={isLoading}>
        <PageLoader isLoading={isLoading} />
      </Dialog>
      <PaymetButton
        disabled={basketItems.length === 0 || error}
        icon={<FcDonate />}
        onClick={() => handleClick(PaymentType.Pos)}
      >
        POS
      </PaymetButton>
      <PaymetButton
        disabled={basketItems.length === 0 || error}
        icon={<FcSelfServiceKiosk />}
        onClick={() => handleClick(PaymentType.Yazarkasa)}
      >
        Y.KASA NAKİT
      </PaymetButton>
    </>
  )
}

export default YazarKasaButtons
