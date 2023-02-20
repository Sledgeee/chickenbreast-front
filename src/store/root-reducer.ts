import { reducer as toastrReducer } from 'react-redux-toastr'
import { combineReducers } from 'redux'

import { authSlice } from '@/store/auth/auth.slice'
import { cartSlice } from '@/store/cart/cart.slice'

export const rootReducer = combineReducers({
	auth: authSlice.reducer,
	cart: cartSlice.reducer,
	toastr: toastrReducer
})
