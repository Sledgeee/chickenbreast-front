import { GetServerSideProps, NextPage } from 'next'

import Checkout from '@/components/pages/cart/checkout/Checkout'

import { IDepartment } from '@/types/department.interface'
import { IProduct } from '@/types/product.interface'

import { API_URL } from '@/api/ky'

const CheckoutPage: NextPage<{
	products: IProduct[]
	departments: IDepartment[]
}> = ({ products, departments }) => {
	return <Checkout products={products} departments={departments} />
}

export const getServerSideProps: GetServerSideProps = async () => {
	const products = await fetch(`${API_URL}/products/`)
	const departments = await fetch(`${API_URL}/departments/`)

	return {
		props: {
			products: await products.json(),
			departments: await departments.json()
		}
	}
}

export default CheckoutPage
