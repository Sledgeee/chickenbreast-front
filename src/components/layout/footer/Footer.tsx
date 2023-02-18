import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

import NavList from '@/components/layout/nav-list/NavList'

import styles from './Footer.module.scss'

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<Link href={'/'}>
						<Image
							width={200}
							height={200}
							src={'/images/logo/logo.png'}
							alt={'logo'}
						/>
					</Link>
				</div>
				<nav className={styles.mainMenu}>
					<NavList cn={styles.menu} active={styles.active} />
				</nav>
				<div className={styles.icons}>
					<Link href={'#'}>
						<FaFacebook />
					</Link>
					<Link href={'#'}>
						<FaInstagram />
					</Link>
				</div>
				<div className={styles.copyright}>
					<span>
						&copy; {new Date().getUTCFullYear()} | Чікенбрест | Всі права
						захищені
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
