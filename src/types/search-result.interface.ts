import { IProduct } from '@/types/product.interface'

export interface IResult {
	count: number
	products: IProduct[]
}

export interface ISearchResult {
	status: number
	result: IResult
}
