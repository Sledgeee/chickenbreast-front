import { ICart } from '@/types/cart.interface'

export interface IOrder extends ICart {
	address: string
	payMethod: number
	status: number
	firstName: string
	lastName: string
	email: string
	phone: string
}
