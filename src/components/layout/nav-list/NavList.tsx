import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface INav {
	cn: string
	active: string
}

const NavList: FC<INav> = ({ cn, active }) => {
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
			path: '/our-chickens',
			label: 'Наші кури'
		},
		{
			path: '/recipes',
			label: 'Рецепти'
		},
		{
			path: '/contacts',
			label: 'Контакти'
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
		</ul>
	)
}

export default NavList
