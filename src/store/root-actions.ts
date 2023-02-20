import * as authActions from './auth/auth.actions'
import * as cartActions from './cart/cart.actions'

export const rootActions = {
	...authActions,
	...cartActions
}
