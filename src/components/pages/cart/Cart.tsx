import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { MdClear } from 'react-icons/md'

import Layout from '@/components/layout/Layout'

import { IProduct } from '@/types/product.interface'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import styles from './Cart.module.scss'
import { API_URL } from '@/api/ky'

const Cart: FC<{ products: IProduct[] }> = ({ products }) => {
	const cart = useCart()
	const router = useRouter()
	const {
		removeProductFromCart,
		incrementProductQuantityInCart,
		decrementProductQuantityInCart,
		refreshCart
	} = useActions()

	useEffect(() => {
		refreshCart(products)
	}, [])

	const [step, setStep] = useState<'cart' | 'checkout'>('cart')

	return (
		<Layout title={'Корзина'}>
			<div className={styles.wrapper}>
				{cart.productsQuantity > 0 ? (
					<div className={styles.container}>
						<div className={styles.content}>
							<table>
								<thead>
									<tr>
										<th style={{ width: '15%' }}></th>
										<th style={{ width: '50%' }}>Назва</th>
										<th style={{ width: '20%' }}>Ціна</th>
										<th style={{ width: '12%' }}>Кількість</th>
										<th style={{ width: '3%' }}></th>
									</tr>
								</thead>
								<tbody>
									{cart.products.map((value, index) => (
										<tr key={index}>
											<td>
												<Image
													width={150}
													height={150}
													src={API_URL + value.image}
													alt={value.name}
												/>
											</td>
											<td>{value.name}</td>
											<td>{value.price}₴</td>
											<td>
												<div className={styles.productCountBlock}>
													<BiMinus
														onClick={() => {
															decrementProductQuantityInCart(value)
														}}
													/>
													<span>{value.quantity}</span>
													<BiPlus
														onClick={() => {
															incrementProductQuantityInCart(value)
														}}
													/>
												</div>
											</td>
											<td>
												<MdClear
													style={{ cursor: 'pointer' }}
													onClick={() => {
														removeProductFromCart(value)
													}}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div>
							<h1>Підсумок:</h1>
							<span>{cart.moneyAmount}₴</span>
							<button onClick={async () => await router.push('/cart/checkout')}>
								Оформити замовлення
							</button>
						</div>
					</div>
				) : (
					<div className={styles.container}>
						<div className={styles.titleWrapper}>
							<h1>Ваша корзина пуста</h1>
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default Cart
