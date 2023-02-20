import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { MdClear } from 'react-icons/md'

import Layout from '@/components/layout/Layout'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import styles from './Cart.module.scss'
import { API_URL } from '@/api/ky'

const Cart: FC = () => {
	const cart = useCart()
	const router = useRouter()
	const { removeProductFromCart } = useActions()

	return (
		<Layout title={'Корзина'}>
			<div className={styles.wrapper}>
				{cart.productsQuantity > 0 ? (
					<div className={styles.container}>
						<table>
							<thead>
								<tr>
									<th style={{ width: '20%' }}></th>
									<th style={{ width: '60%' }}>Назва</th>
									<th style={{ width: '20%' }}>Ціна</th>
									<th style={{ width: '20%' }}></th>
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
						<div>
							<h1>Підсумок:</h1>
							<span>Товар: {cart.moneyAmount}₴</span>
							<span>Доставка: 65₴</span>
							<span>Загалом: {cart.moneyAmount + 65}₴</span>
							<button onClick={async () => await router.push('/cart/checkout')}>
								Оформити замовлення
							</button>
						</div>
					</div>
				) : (
					<div className={styles.container}>
						<div className={styles.titleWrapper}>
							<h1>Корзина пуста</h1>
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default Cart
