import { GetServerSideProps, NextPage } from 'next'

import Cart from '@/components/pages/cart/Cart'

import { IProduct } from '@/types/product.interface'

import { API_URL } from '@/api/ky'

const CartPage: NextPage<{ products: IProduct[] }> = ({ products }) => {
	return <Cart products={products} />
}

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(`${API_URL}/products/`)
	const products = await res.json()

	return {
		props: {
			products
		}
	}
}

export default CartPage
