import { IProduct } from '@/types/product.interface'

interface IData {
	category: string
	products: IProduct[]
}

export interface IRetail {
	data: IData[]
}
