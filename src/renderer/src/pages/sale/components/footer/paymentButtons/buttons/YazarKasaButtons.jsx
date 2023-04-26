import React, { useEffect, useState } from 'react'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import { FcDonate, FcSelfServiceKiosk } from 'react-icons/fc'
import { PaymentType, ReportType } from '../../../../../../config/constants'
import { toast } from 'react-hot-toast'
import { useNewSale } from '../../../../../../utils/hooks/useSaleRepository'
import { useBasket } from '../../../../../../store/features/basket'
import SaleHelper from '../../../../../../utils/helpers/saleHelper'
import PageLoader from '../../../../../../components/common/PageLoader'
import { Dialog } from '@mui/material'
import { useSettings } from '../../../../../../store/features/settings'

const YazarKasaButtons = () => {
  const [socket, setSocket] = useState(null)
  const [payment, setPayment] = useState({
    payment: null,
    paymentType: null,
    reportType: null
  })

  const { data: basketItems } = useBasket()
  const { settings } = useSettings()

  const onSuccess = (response) => {
    const { data: result } = response.data

    SaleHelper.succesSale(result)

    socket?.send(
      JSON.stringify({
        Payment: payment.payment,
        SlipCopy: true,
        Data: basketItems.map((item) => ({
          DeptId: SaleHelper.getDeptId(item.kdvOrani),
          Amount: item.miktar,
          Price: item.satisFiat1,
          Name: item.stokAdi
        }))
      })
    )
  }

  console.log(basketItems)

  const { mutate: newSale, isLoading } = useNewSale(onSuccess)

  const connectHugin = async () => {
    const localAddress = await window.api.getLocalAddress()

    const ipAdddress = await window.api.getLocalAddress()
    const newSocket = new WebSocket(`ws://${localAddress}:1235`)

    setSocket(newSocket)

    newSocket.addEventListener('open', () => {
      toast.success('Yazarkasaya iletişimi kuruluyor.')
    })

    newSocket.addEventListener('message', (data) => {
      const response = JSON.parse(data.data)

      switch (response?.status) {
        case 200:
          return toast.success(response?.data)
        case 500:
          return toast.error(response?.data)
        default:
          return
      }
    })

    newSocket.addEventListener('error', () => {
      toast.error('Yazarkasa bağlantı hatası(Socket Error)')
    })

    return () => {
      newSocket.close()
      setSocket(null)
    }
  }

  useEffect(() => {
    connectHugin()
  }, [])

  const handleClick = async (paymentType) => {
    setPayment({
      payment: paymentType === PaymentType.Yazarkasa ? -1 : 0,
      paymentType
    })

    const personal = await window.api.getStoreValue('personal')

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
      transfer: true,
      vatGroup: item.kdvOrani.toString()
    }))

    newSale({ ...requestBody, sales })
  }

  return (
    <>
      <Dialog open={isLoading}>
        <PageLoader isLoading={isLoading} />
      </Dialog>
      <PaymetButton icon={<FcDonate />} onClick={() => handleClick(PaymentType.Pos)}>
        POS
      </PaymetButton>
      <PaymetButton
        icon={<FcSelfServiceKiosk />}
        onClick={() => handleClick(PaymentType.Yazarkasa)}
      >
        Y.KASA NAKİT
      </PaymetButton>
    </>
  )
}

export default YazarKasaButtons
