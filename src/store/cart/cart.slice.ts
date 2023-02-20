import { createSlice } from '@reduxjs/toolkit'

import {
	addProductToCart,
	clearCart,
	removeProductFromCart
} from '@/store/cart/cart.actions'
import { ICartInitialState } from '@/store/cart/cart.interface'

const initialState: ICartInitialState = {
	cart: {
		productsQuantity: 0,
		moneyAmount: 0,
		products: []
	}
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (state, { payload }) => {
			state.cart.products.push(payload)
		}
	},
	extraReducers: builder => {
		builder.addCase(addProductToCart.fulfilled, (state, { payload }) => {
			state.cart.products = [...state.cart.products, payload]
			state.cart.productsQuantity += 1
			state.cart.moneyAmount += payload.price
		})
		builder.addCase(removeProductFromCart.fulfilled, (state, { payload }) => {
			state.cart.products = state.cart.products.filter(
				x => x._id !== payload._id
			)
			state.cart.productsQuantity -= 1
			state.cart.moneyAmount -= payload.price
		})
		builder.addCase(clearCart.fulfilled, state => {
			state.cart.products = []
			state.cart.productsQuantity = 0
			state.cart.moneyAmount = 0
		})
	}
})

export const { addProduct } = cartSlice.actions
