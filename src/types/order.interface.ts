export interface IOrderItem {
	product: {
		_id: string
		name: string
		image: string
		price: number
	}
	quantity: number
	totalSum: number
}

export interface IOrder {
	_id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	city: string
	address: string
	productsQuantity: number
	moneyAmount: number
	items: IOrderItem[]
	status: string | undefined
}
