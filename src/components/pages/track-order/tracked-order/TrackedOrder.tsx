import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import Layout from '@/components/layout/Layout'

import { IOrder } from '@/types/order.interface'

import styles from './TrackedOrder.module.scss'
import { API_URL } from '@/api/ky'

const TrackedOrder: FC<{ order: IOrder }> = ({ order }) => {
	const [isClient, setIsClient] = useState(false)
	const [value, setValue] = useState('')
	const [errored, setErrored] = useState(false)
	const { push } = useRouter()

	if (!order._id) {
		push('/404')
	}

	return (
		<Layout title={`Замовлення ${order._id}`}>
			<div className={styles.wrapper}>
				{isClient ? (
					<div className={styles.container}>
						<div className={styles.head}>
							<h1>
								<span>Ідентифікатор замовлення: {order._id}</span>
							</h1>
							<h2>
								<span>
									Клієнт: {order.firstName} {order.lastName}
								</span>
							</h2>
							<h2>
								<span>E-Mail: {order.email}</span>
							</h2>
							<h2>
								<span>Телефон: {order.phone}</span>
							</h2>
							<h2>
								<span>Сума: {order.moneyAmount}₴</span>
							</h2>
							<h2>
								<span>
									Загальна кількість товарів: {order.productsQuantity}
								</span>
							</h2>
							<h2>
								<span>Статус замовлення: {order.status}</span>
							</h2>
						</div>
						<div className={styles.items}>
							<h2>Товари із замовлення:</h2>
							<table>
								<thead>
									<tr>
										<th style={{ width: '10%' }}></th>
										<th style={{ width: '40%' }}>Назва</th>
										<th style={{ width: '10%' }}>Кількість</th>
										<th style={{ width: '20%' }}>Ціна</th>
										<th style={{ width: '20%' }}>Загалом</th>
									</tr>
								</thead>
								<tbody>
									{order.items.map((value, index) => (
										<tr key={index}>
											<td>
												<Image
													width={150}
													height={150}
													src={API_URL + value.product.image}
													alt={value.product.name}
												/>
											</td>
											<td>{value.product.name}</td>
											<td>
												<span>{value.quantity}</span>
											</td>
											<td>{value.product.price}₴</td>
											<td>
												<span>{value.totalSum}₴</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className={styles.container}>
						<div className={styles.acceptPerson}>
							<h1>Підтвердіть особу</h1>
							<h2>
								Для цього введіть E-Mail або номер телефону, який був вказаний
								під час оформлення замовлення
							</h2>
							<div className={styles.area}>
								<input
									value={value}
									onChange={event => {
										setValue(event.target.value)
										if (!event.target.value) {
											setErrored(true)
											return
										} else setErrored(false)
									}}
									placeholder={'E-Mail або телефон...'}
									className={`${errored ? styles.error : ''}`}
								/>
								<button
									onClick={() => {
										setErrored(false)
										if (value === order.email || value === order.phone) {
											setIsClient(true)
										} else setErrored(true)
									}}
								>
									Підтвердити
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default TrackedOrder
