import { Button, Stack } from '@mui/material'
import React from 'react'
import NakitButton from './buttons/NakitButton'
import YazarkasaNakitButton from './buttons/YazarkasaNakitButton'
import PosButton from './buttons/PosButton'
import CariButton from './buttons/CariButton'
import PersonelGiderButton from './buttons/PersonelGiderButton'
import MusteriGider from './buttons/MusteriGider'
import FisYazdirButton from './buttons/FisYazdirButton'
import YazarKasaButtons from './buttons/YazarKasaButtons'

const PaymetButtons = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <NakitButton />
      <YazarKasaButtons />
      {/* <CariButton /> */}
      <PersonelGiderButton />
      <MusteriGider />
      <FisYazdirButton />
    </Stack>
  )
}

export default PaymetButtons
