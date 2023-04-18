import React from 'react'
import { FcDonate } from 'react-icons/fc'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'

const PosButton = () => {
  return (
    <>
      <PaymetButton icon={<FcDonate />}>POS</PaymetButton>
    </>
  )
}

export default PosButton
