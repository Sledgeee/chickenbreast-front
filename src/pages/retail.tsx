import { GetServerSideProps, NextPage } from 'next'

import Retail from '@/components/pages/retail/Retail'
import { IRetail } from '@/components/pages/retail/retail.interface'

import { ICategory } from '@/types/category.interface'
import { IProduct } from '@/types/product.interface'

const RetailPage: NextPage<IRetail> = ({ data }) => {
	return <Retail data={data} />
}

export const getServerSideProps: GetServerSideProps = async () => {
	const products = await fetch('https://chickenbreast-api.vercel.app/products/')
	const categories = await fetch(
		'https://chickenbreast-api.vercel.app/category/'
	)

	const prods = (await products.json()) as IProduct[]
	const cats = (await categories.json()) as ICategory[]

	const data = []
	for (const cat of cats) {
		data.push({
			category: cat.name,
			products: prods.filter(x => x.category.name === cat.name)
		})
	}

	return {
		props: {
			data
		}
	}
}

export default RetailPage
