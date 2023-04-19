import React from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcCancel } from 'react-icons/fc'

const LogoutButton = () => {
  return (
    <>
      <LeftSideButton icon={<FcCancel />}>Vardiya Bitir</LeftSideButton>
    </>
  )
}

export default LogoutButton
