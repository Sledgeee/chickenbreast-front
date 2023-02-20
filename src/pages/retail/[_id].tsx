import { GetServerSideProps, NextPage } from 'next'

import RetailProduct from '@/components/pages/retail/retail-product/RetailProduct'

import { IProduct } from '@/types/product.interface'

import { API_URL } from '@/api/ky'

const RetailProductPage: NextPage<{ product: IProduct }> = ({ product }) => {
	return <RetailProduct product={product} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { _id } = query
	const response = await fetch(`${API_URL}/products/${_id}`)

	return {
		props: {
			product: await response.json()
		}
	}
}

export default RetailProductPage
