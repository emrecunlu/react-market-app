import React from 'react'
import { FcRules } from 'react-icons/fc'
import PaymetButton from '../../../../../../components/buttons/PaymetButton'

const FisYazdirButton = () => {
  return (
    <>
      <PaymetButton
        icon={<FcRules />}
        onClick={() => window.electron.ipcRenderer.send('print:slip')}
      >
        FİŞ YAZDIR
      </PaymetButton>
    </>
  )
}

export default FisYazdirButton
