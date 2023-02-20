import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

import Layout from '@/components/layout/Layout'

import { IProduct } from '@/types/product.interface'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import styles from './RetailProduct.module.scss'
import { API_URL } from '@/api/ky'

const RetailProduct: FC<{ product: IProduct }> = ({ product }) => {
	const [prodInCart, setProdInCart] = useState(false)
	const { addProductToCart, removeProductFromCart } = useActions()
	const cart = useCart()

	useEffect(() => {
		if (
			cart.productsQuantity !==
			cart.products.filter(x => x._id !== product._id).length
		) {
			setProdInCart(true)
		}
	}, [])

	return (
		<Layout title={product.name}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div className={styles.product}>
						<div>
							<Image
								width={700}
								height={700}
								src={API_URL + product.image}
								alt={product.name}
							/>
						</div>
						<div>
							<div>
								<h1>{product.name}</h1>
								<h2>{product.price} ₴</h2>
								<button
									className={styles.button}
									onClick={() => {
										if (!prodInCart) {
											addProductToCart(product)
										} else removeProductFromCart(product)
										setProdInCart(value => !value)
									}}
								>
									{!prodInCart ? 'Додати в корзину' : 'Видалити з корзини'}
								</button>
							</div>
							<h2>Характеристики товару</h2>
							<table className={styles.table}>
								<thead>
									<tr>
										<th>Назва</th>
										<th>Значення</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Розмір порції</td>
										<td>{product.servingSize} грам</td>
									</tr>
									<tr>
										<td>Калорії</td>
										<td>{product.calories}</td>
									</tr>
									<tr>
										<td>Калорії з жиру</td>
										<td>{product.caloriesFromFat}</td>
									</tr>
									<tr>
										<td>Загальний жир</td>
										<td>{product.totalFat} грам</td>
									</tr>
									<tr>
										<td>Насичені жири</td>
										<td>{product.saturatedFat} грам</td>
									</tr>
									<tr>
										<td>Холестерин</td>
										<td>{product.cholesterol} міліграм</td>
									</tr>
									<tr>
										<td>Натрій</td>
										<td>{product.sodium} міліграм</td>
									</tr>
									<tr>
										<td>Вуглеводи</td>
										<td>{product.totalCarbohydates} грам</td>
									</tr>
									<tr>
										<td>Харчові волокна</td>
										<td>{product.dietaryFiber} грам</td>
									</tr>
									<tr>
										<td>Цукор</td>
										<td>{product.sugars} грам</td>
									</tr>
									<tr>
										<td>Білок</td>
										<td>{product.protein} грам</td>
									</tr>
									<tr>
										<td>Вітамін А</td>
										<td>{product.vitaminA}%</td>
									</tr>
									<tr>
										<td>Вітамін С</td>
										<td>{product.vitaminC}%</td>
									</tr>
									<tr>
										<td>Кальцій</td>
										<td>{product.calcium}%</td>
									</tr>
									<tr>
										<td>Залізо</td>
										<td>{product.iron}%</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default RetailProduct
