import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slice/themeSlice'
 
const store = configureStore({
  reducer: {
    theme:themeReducer
  }
})
export default store;
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']