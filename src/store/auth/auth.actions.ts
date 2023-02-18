import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { AuthService } from '@/services/auth/auth.service'

import { toastError } from '@/utils/api.utils'

export const register = createAsyncThunk<any, any>(
	'auth/register',
	async ({ firstName, lastName, email, password }, thunkAPI) => {
		try {
			const response = await AuthService.register(
				firstName,
				lastName,
				email,
				password
			)
			toastr.success('Registration', 'Success')
			return response
		} catch (e) {
			toastError(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const login = createAsyncThunk<any, any>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await AuthService.login(email, password)
			toastr.success('Login', 'Success')
			return response
		} catch (e) {
			toastError(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const logout = createAsyncThunk<any, any>(
	'auth/logout',
	async ({ accessToken }, thunkAPI) => {
		try {
			const response = await AuthService.logout(accessToken)
			toastr.success('Logout', 'Success')
			return response
		} catch (e) {
			toastError(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)
