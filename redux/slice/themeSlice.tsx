import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value:false,
  },
  reducers: {
    switchLight: (state) => {
        state.value = !state.value
      },
  },
})

// Action creators are generated for each case reducer function
export const {  switchLight} = themeSlice.actions
export default themeSlice.reducer