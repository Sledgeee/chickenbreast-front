import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { IProduct } from '@/types/product.interface'

import { toastError } from '@/utils/api.utils'

export const addProductToCart = createAsyncThunk<any, IProduct>(
	'cart/add',
	async (product, thunkAPI) => {
		try {
			toastr.success('Корзина', 'Товар успішно доданий')
			return product
		} catch (e) {
			toastError(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const removeProductFromCart = createAsyncThunk<any, IProduct>(
	'cart/remove',
	async (product, thunkAPI) => {
		try {
			toastr.success('Корзина', 'Товар успішно видалено')
			return product
		} catch (e) {
			toastError(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const clearCart = createAsyncThunk<any, void>(
	'cart/clear',
	async () => {}
)
