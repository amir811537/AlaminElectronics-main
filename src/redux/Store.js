import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import { baseApi } from './api/baseApi'
import filterSlice from './features/filter/filterSlice'
import CartSlice from './features/Cart/CartSlice'

export const store = configureStore({
    reducer: {
        // tasksSlice: tasksSlice,
        [baseApi.reducerPath]: baseApi.reducer,
        userSlice: userSlice,
        filterSearch : filterSlice,
        CartSlice : CartSlice
      },
    
    
    middleware: (getDefaultMiddleware) =>    getDefaultMiddleware().concat(baseApi.middleware),
})