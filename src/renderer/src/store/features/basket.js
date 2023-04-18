import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState = {
  data: [],
  selecteds: []
}

const basket = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    add: (state, action) => {
      state.data.push(action.payload)
    },
    increment: (state, action) => {
      const item = state.data.find((item) => item.stokKodu === action.payload)

      item.miktar += 1
      item.toplamFiat = item.miktar * item.satisFiat1
    },
    incrementByAmount: (state, action) => {
      const { stockCode, amount } = action.payload

      const item = state.data.find((item) => item.stokKodu === stockCode)

      item.miktar += amount
      item.toplamFiat = item.miktar * item.satisFiat1
    },
    set: (state, action) => {
      const rowNumber = state.data.findIndex((item) => item.stokKodu === action.payload.stokKodu)

      state.data[rowNumber] = action.payload
    },
    setSelecteds: (state, action) => {
      state.selecteds = action.payload
    },
    removeSelecteds: (state) => {
      state.data = state.data.filter((item) => !state.selecteds.includes(item.stokKodu))
      state.selecteds = []
    },
    clearAll: (state) => {
      state.data = []
      state.selecteds = []
    }
  }
})

export default basket.reducer
export const { add, increment, incrementByAmount, clearAll, set, setSelecteds, removeSelecteds } =
  basket.actions
export const useBasket = () => useSelector((state) => state.basket)
