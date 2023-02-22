import { ICartProduct } from '@/types/product.interface'

export interface ICart {
	productsQuantity: number
	moneyAmount: number
	products: ICartProduct[]
}
