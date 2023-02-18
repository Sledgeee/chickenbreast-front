import { createSlice } from '@reduxjs/toolkit'

import { login, logout, register } from '@/store/auth/auth.actions'
import { IAuthInitialState } from '@/store/auth/auth.interface'

const initialState: IAuthInitialState = {
	user: undefined,
	accessToken: '',
	isLoading: false
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateToken: (state, { payload }) => {
			state.accessToken = payload.accessToken
		},
		logOut: state => {
			state.user = null
			state.accessToken = ''
		}
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.accessToken = payload.accessToken
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = null
				state.accessToken = ''
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.accessToken = payload.accessToken
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
				state.accessToken = ''
			})
			.addCase(logout.pending, state => {
				state.isLoading = true
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
				state.accessToken = ''
			})
			.addCase(logout.rejected, state => {
				state.isLoading = false
				state.user = null
				state.accessToken = ''
			})
	}
})

export const { updateToken, logOut } = authSlice.actions
