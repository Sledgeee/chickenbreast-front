import { reducer as toastrReducer } from 'react-redux-toastr'
import { combineReducers } from 'redux'

import { cartSlice } from '@/store/cart/cart.slice'

export const rootReducer = combineReducers({
	cart: cartSlice.reducer,
	toastr: toastrReducer
})
