import { IBase } from '@/types/base.interface'
import { IProduct } from '@/types/product.interface'

export interface ICart extends IBase {
	productsQuantity: number
	moneyAmount: number
	products: IProduct[]
}
