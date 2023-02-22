import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { IProduct } from '@/types/product.interface'

export const addProductToCart = createAsyncThunk<IProduct, IProduct>(
	'cart/add',
	async (product, thunkAPI) => {
		toastr.success('Корзина', 'Товар успішно доданий')
		return product
	}
)

export const removeProductFromCart = createAsyncThunk<string, IProduct>(
	'cart/remove',
	async (product, thunkAPI) => {
		toastr.success('Корзина', 'Товар успішно видалено')
		return product._id
	}
)

export const incrementProductQuantityInCart = createAsyncThunk<
	string,
	IProduct
>('cart/increment', async (product, thunkAPI) => {
	return product._id
})

export const decrementProductQuantityInCart = createAsyncThunk<
	string,
	IProduct
>('cart/decrement', async (product, thunkAPI) => {
	return product._id
})

export const refreshCart = createAsyncThunk<IProduct[], IProduct[]>(
	'cart/refresh',
	async (products, thunkAPI) => {
		return products
	}
)

export const clearCart = createAsyncThunk<void, void>(
	'cart/clear',
	async () => {}
)
