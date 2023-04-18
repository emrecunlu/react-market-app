import { configureStore } from '@reduxjs/toolkit'
import personal from './features/personal'
import basket from './features/basket'

const store = configureStore({
  reducer: {
    personal,
    basket
  }
})

export default store
