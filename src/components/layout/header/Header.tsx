import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect } from 'react'

import NavList from '@/components/layout/nav-list/NavList'

import styles from './Header.module.scss'

const Header: FC = () => {
	useEffect(() => {
		window.onscroll = function () {
			const header = document.getElementById('header')
			if (header != null) {
				if (window.pageYOffset > 50) {
					header.classList.add(styles.bg)
				} else {
					header.classList.remove(styles.bg)
				}
			}
		}
	}, [])

	return (
		<header id={'header'} className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div className={styles.logo}>
						<Link href={'/'}>
							<Image
								width={110}
								height={110}
								src={'/images/logo/logo.png'}
								alt={'logo'}
							/>
						</Link>
					</div>
					<nav className={styles.mainMenu}>
						<NavList cn={styles.menu} active={styles.active} />
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
