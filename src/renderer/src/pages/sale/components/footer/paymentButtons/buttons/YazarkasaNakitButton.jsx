import React, { useEffect } from 'react'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import { FcSelfServiceKiosk } from 'react-icons/fc'

const YazarkasaNakitButton = () => {
  return (
    <>
      <PaymetButton icon={<FcSelfServiceKiosk />}>Y.KASA NAKİT</PaymetButton>
    </>
  )
}

export default YazarkasaNakitButton
