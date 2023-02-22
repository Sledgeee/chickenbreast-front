import Image from 'next/image'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'

import { IOrder } from '@/types/order.interface'

import styles from './TrackOrder.module.scss'
import { API_URL } from '@/api/ky'

const TrackOrder: FC<{ order: IOrder }> = ({ order }) => {
	return (
		<Layout title={`Замовлення ${order._id}`}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div className={styles.head}>
						<h1>
							<span>Ідентифікатор замовлення: {order._id}</span>
						</h1>
						<h2>
							<span>Сума: {order.moneyAmount}₴</span>
						</h2>
						<h2>
							<span>Загальна кількість товару: {order.productsQuantity}</span>
						</h2>
						<h2>
							<span>Статус замовлення: {order.status}</span>
						</h2>
					</div>
					<div className={styles.items}>
						<h2>Товар із замовлення:</h2>
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
			</div>
		</Layout>
	)
}

export default TrackOrder
