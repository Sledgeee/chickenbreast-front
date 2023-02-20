import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { BsCart, BsCartCheck } from 'react-icons/bs'

import Layout from '@/components/layout/Layout'
import { IRetail } from '@/components/pages/retail/retail.interface'

import { IProduct } from '@/types/product.interface'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import styles from './Retail.module.scss'
import { API_URL } from '@/api/ky'

const Retail: FC<IRetail> = ({ data }) => {
	const [isOpen, setIsOpen] = useState(true)
	const cart = useCart()

	return (
		<Layout title={'Магазин'}>
			<div className={styles.head}>
				<h3>
					<span>Чікенбрест</span>
				</h3>
				<h2>
					<span>МАГАЗИН</span>
				</h2>
			</div>
			<div className={styles.shopArea}>
				{data?.map((data, index) => {
					if (data.products.length > 0) {
						return (
							<div className={styles.category} key={'c' + index}>
								<div className={styles.title}>
									<h1>{data.category}</h1>
									<div></div>
								</div>
								<div className={styles.cards}>
									{data.products?.map((prod, index) => (
										<ProductCard
											key={index}
											prod={prod}
											isInCart={
												cart.products.filter(x => x._id === prod._id).length > 0
											}
										/>
									))}
								</div>
							</div>
						)
					}
				})}
			</div>
		</Layout>
	)
}

const ProductCard: FC<{ prod: IProduct; isInCart: boolean }> = ({
	prod,
	isInCart
}) => {
	const [inCart, setInCart] = useState(isInCart)
	const { addProductToCart, removeProductFromCart } = useActions()

	return (
		<div id={prod._id} className={styles.card}>
			<Link href={`/retail/${prod._id}`}>
				<Image
					width={300}
					height={300}
					src={API_URL + prod.image}
					alt={'img'}
				/>
			</Link>
			<div className={styles.cardBottom}>
				<Link href={`/retail/${prod._id}`}>
					<span>{prod.name}</span>
				</Link>
				<div>
					<span>{prod.price} ₴</span>
					<button
						onClick={() => {
							if (!inCart) {
								addProductToCart(prod)
							} else removeProductFromCart(prod)
							setInCart(value => !value)
						}}
					>
						{!inCart ? <BsCart /> : <BsCartCheck />}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Retail
