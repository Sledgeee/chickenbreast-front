import { IBase } from '@/types/base.interface'
import { ICategory } from '@/types/category.interface'

export interface IProduct extends IBase {
	name: string
	servingSize: number
	calories: number
	caloriesFromFat: number
	totalFat: number
	saturatedFat: number
	cholesterol: number
	sodium: number
	totalCarbohydates: number
	dietaryFiber: number
	sugars: number
	protein: number
	vitaminA: number
	calcium: number
	vitaminC: number
	iron: number
	price: number
	image: string
	category: ICategory
}

export interface ICartProduct extends IProduct {
	quantity: number
	totalSum: number
}
