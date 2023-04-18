import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState = {
  isLoggedIn: false,
  credentials: null
}

const personal = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.credentials = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.credentials = null
    }
  }
})

export default personal.reducer
export const { login, logout } = personal.actions
export const usePersonal = () => useSelector((state) => state.personal)
