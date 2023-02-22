import { createSlice } from '@reduxjs/toolkit'

import { ICartProduct } from '@/types/product.interface'

import {
	addProductToCart,
	clearCart,
	decrementProductQuantityInCart,
	incrementProductQuantityInCart,
	refreshCart,
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
			state.cart.products = [
				...state.cart.products,
				{
					...payload,
					quantity: 1,
					totalSum: payload.price
				}
			]
			state.cart.productsQuantity += 1
			state.cart.moneyAmount += payload.price
		})
		builder.addCase(removeProductFromCart.fulfilled, (state, { payload }) => {
			const prod = state.cart.products.find(x => x._id === payload)
			if (prod) {
				state.cart.productsQuantity -= prod.quantity
				state.cart.moneyAmount -= prod.totalSum
				state.cart.products = state.cart.products.filter(x => x._id !== payload)
			}
		})
		builder.addCase(
			incrementProductQuantityInCart.fulfilled,
			(state, { payload }) => {
				state.cart.products = [
					...state.cart.products.map(x => {
						if (x._id === payload) {
							x.quantity += 1
							x.totalSum += x.price
							state.cart.productsQuantity += 1
							state.cart.moneyAmount += x.price
						}
						return x
					})
				]
			}
		)
		builder.addCase(
			decrementProductQuantityInCart.fulfilled,
			(state, { payload }) => {
				state.cart.products = [
					...state.cart.products.map(x => {
						if (x._id === payload) {
							if (x.quantity > 1) {
								x.quantity -= 1
								x.totalSum -= x.price
								state.cart.productsQuantity -= 1
								state.cart.moneyAmount -= x.price
							}
						}
						return x
					})
				]
			}
		)
		builder.addCase(clearCart.fulfilled, state => {
			state.cart.products = []
			state.cart.productsQuantity = 0
			state.cart.moneyAmount = 0
		})
		builder.addCase(refreshCart.fulfilled, (state, { payload }) => {
			const items: ICartProduct[] = []
			state.cart.moneyAmount = 0
			for (const prod of payload) {
				const cartItem = state.cart.products.find(x => x._id === prod._id)
				if (cartItem) {
					cartItem.price = prod.price
					cartItem.totalSum = cartItem.quantity * prod.price
					state.cart.moneyAmount += cartItem.totalSum
					items.push(cartItem)
				}
			}
			state.cart.products = items
		})
	}
})

export const { addProduct } = cartSlice.actions
