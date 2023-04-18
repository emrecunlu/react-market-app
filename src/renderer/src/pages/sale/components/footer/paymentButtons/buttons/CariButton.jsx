import React from 'react'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'
import { FcBusinessman } from 'react-icons/fc'

const CariButton = () => {
  return (
    <>
      <PaymetButton disabled={true} icon={<FcBusinessman />}>
        CARİ
      </PaymetButton>
    </>
  )
}

export default CariButton
