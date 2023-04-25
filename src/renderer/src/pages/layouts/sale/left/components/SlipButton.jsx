import React from 'react'
import LeftSideButton from '../../../../../components/buttons/LeftSideButton'
import { FcViewDetails } from 'react-icons/fc'

const SlipButton = () => {
  return (
    <>
      <LeftSideButton
        onClick={() => window.electron.ipcRenderer.send('print:slip')}
        icon={<FcViewDetails />}
      >
        Son Fişi Yazdır
      </LeftSideButton>
    </>
  )
}

export default SlipButton
