import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState = {
  settings: {
    printerName: '',
    serverAddress: '',
    localAddress: '',
    vatIncluded: false
  }
}

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    set: (state, action) => {
      state.settings = { ...action.payload }
    }
  }
})

export default settings.reducer
export const { set } = settings.actions
export const useSettings = () => useSelector((state) => state.settings)
