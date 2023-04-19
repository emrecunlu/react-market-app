import { configureStore } from '@reduxjs/toolkit'
import personal from './features/personal'
import basket from './features/basket'
import settings from './features/settings'

const store = configureStore({
  reducer: {
    personal,
    basket,
    settings
  }
})

export default store
