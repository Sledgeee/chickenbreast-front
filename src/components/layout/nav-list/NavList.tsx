import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { FaOpencart } from 'react-icons/fa'

import { useCart } from '@/hooks/useCart'

import styles from './NavList.module.scss'

const NavList: FC<{
	cn: string
	active: string
}> = ({ cn, active }) => {
	const cart = useCart()
	const router = useRouter()
	const routes = [
		{
			path: '/retail',
			label: 'Магазин'
		},
		{
			path: '/our-story',
			label: 'Наша історія'
		},
		{
			path: '/contacts',
			label: 'Контакти'
		},
		{
			path: '/track-order',
			label: 'Відстежити замовлення'
		}
	]

	return (
		<ul className={cn}>
			{routes.map((value, index) => (
				<li key={index}>
					<Link
						href={value.path}
						className={`${router.pathname === value.path ? active : ''}`}
					>
						{value.label}
					</Link>
				</li>
			))}
			<li>
				<Link
					href={'/cart'}
					className={`${styles.icon} ${
						router.pathname === '/cart' ? active : ''
					}`}
				>
					<FaOpencart />
					<span>{cart.productsQuantity}</span>
				</Link>
			</li>
		</ul>
	)
}

export default NavList
