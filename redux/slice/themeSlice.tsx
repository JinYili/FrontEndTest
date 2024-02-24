import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value:false,
  },
  reducers: {
    on: (state) => {
      state.value = true
    },
    off: (state) => {
      state.value = false
    },
    switchLight: (state) => {
        state.value = !state.value
      },
  },
})

// Action creators are generated for each case reducer function
export const { on, off , switchLight} = themeSlice.actions
export default themeSlice.reducer