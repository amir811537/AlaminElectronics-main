import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    discount: 0,
    cartTotal: 0,
    discountedCartTotal: 0

}

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        setCartTotal: (state, { payload }) => {
            state.cartTotal = payload.cartTotal;

        },
        setDiscount: (state, { payload }) => {
            state.discount = payload.discount;
        },
        setDiscountedCartTotal: (state, { payload }) => {
            state.discountedCartTotal = payload.discountedCartTotal;

        },

    }
})

export const { setCartTotal ,setDiscount , setDiscountedCartTotal} = cartSlice.actions
export default cartSlice.reducer

