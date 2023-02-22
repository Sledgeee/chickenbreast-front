import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import Layout from '@/components/layout/Layout'
import LoadingIndicator from '@/components/ui/loading-indicator/LoadingIndicator'

import { IDepartment } from '@/types/department.interface'
import { IErrorResponse } from '@/types/error-response.interface'
import { IOrder, IOrderItem } from '@/types/order.interface'
import { IProduct } from '@/types/product.interface'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import styles from './Checkout.module.scss'
import { $ky, API_URL } from '@/api/ky'

const Checkout: FC<{
	products: IProduct[]
	departments: IDepartment[]
}> = ({ products, departments }) => {
	const cart = useCart()
	const router = useRouter()
	const { refreshCart, clearCart } = useActions()
	const [selectedCity, setSelectedCity] = useState(departments[0].city)
	const [isLoading, setIsLoading] = useState(true)
	const [orderCreated, setOrderCreated] = useState(false)
	const [orderId, setOrderId] = useState('')

	useEffect(() => {
		if (cart.productsQuantity === 0) {
			router.push('/cart')
		} else {
			refreshCart(products)
			setIsLoading(false)
		}
	}, [])

	const handleSubmit = async (event: any) => {
		event.preventDefault()
		setIsLoading(true)

		const { firstName, lastName, email, phone, city, address } = event.target

		const order = {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			phone: phone.value,
			city: city.value,
			address: address.value,
			productsQuantity: cart.productsQuantity,
			moneyAmount: cart.moneyAmount,
			items: (() => {
				const items: IOrderItem[] = []
				cart.products.forEach(value => {
					items.push({
						product: {
							_id: value._id,
							name: value.name,
							image: value.image,
							price: value.price
						},
						quantity: value.quantity,
						totalSum: value.totalSum
					})
				})
				return items
			})()
		}

		try {
			const res = await $ky.post('orders/', {
				json: order
			})
			if (res.status === 200) {
				clearCart()
				setOrderCreated(true)
				setOrderId(((await res.json()) as IOrder)._id)
			} else {
				const error = (await res.json()) as IErrorResponse
				toastr.error(error.message, '')
			}
		} catch {
			toastr.error(
				'Замовлення',
				'Під час оформлення замовлення сталась непередбачена помилка'
			)
		}
		setIsLoading(false)
	}

	return (
		<Layout title={'Оформлення замовлення'}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<form onSubmit={handleSubmit}>
						{isLoading ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
									height: '42.9vh',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									zIndex: 100
								}}
							>
								<LoadingIndicator />
							</div>
						) : !orderCreated ? (
							<>
								<div className={styles.content}>
									<div className={styles.area}>
										<h1>Ваші контактні дані</h1>
										<div>
											<input
												type={'text'}
												name={'firstName'}
												id={'firstName'}
												placeholder={"Ім'я*"}
												required
											/>
											<input
												type={'text'}
												name={'lastName'}
												id={'lastName'}
												placeholder={'Прізвище*'}
												required
											/>
										</div>
										<div>
											<input
												type={'tel'}
												name={'phone'}
												id={'phone'}
												placeholder={'Телефон*'}
												required
											/>
											<input
												type={'text'}
												name={'email'}
												id={'email'}
												placeholder={'E-Mail*'}
												required
											/>
										</div>
									</div>
									<div className={styles.area}>
										<h1>Пункт видачі</h1>
										<div>
											<select
												name={'city'}
												id={'city'}
												placeholder={'Вкажіть ваше місто*'}
												onChange={event => {
													setSelectedCity(event.target.value)
												}}
												required
											>
												{departments.map((value, index) => (
													<option key={index} value={value.city}>
														{value.city}
													</option>
												))}
											</select>
											<select
												name={'address'}
												id={'address'}
												placeholder={'Оберіть адресу магазину*'}
												required
											>
												{departments
													.filter(x => x.city === selectedCity)[0]
													.addresses.map((value, index) => (
														<option value={value} key={index}>
															{value}
														</option>
													))}
											</select>
										</div>
									</div>
									<div className={styles.area}>
										<h1>Ваше замовлення</h1>
										<div>
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
															<td>
																<span>{value.quantity}</span>
															</td>
															<td>{value.price}₴</td>
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
								<div className={styles.total}>
									<h1>До сплати:</h1>
									<span>{cart.moneyAmount}₴</span>
									<div className={styles.buttons}>
										<button className={styles.submit} type={'submit'}>
											Замовлення підтверджую
										</button>
										<button
											className={styles.edit}
											type={'button'}
											onClick={async () => {
												await router.push('/cart')
											}}
										>
											Редагувати замовлення
										</button>
									</div>
								</div>
							</>
						) : (
							<>
								<div className={styles.orderCreated}>
									<span>Ваше замовлення успішно створене!</span>
									<span>
										Ідентифікатор: <b>{orderId}</b>. Його можна використати для
										перегляду інформації про замовлення.
									</span>
									<br />
									<span>
										Також на вказану Вами пошту було відправлено лист з
										інформацією про замовлення.
									</span>
								</div>
							</>
						)}
					</form>
				</div>
			</div>
		</Layout>
	)
}

export default Checkout
