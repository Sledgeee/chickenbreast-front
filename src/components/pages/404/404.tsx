import Link from 'next/link'
import { FC } from 'react'

import styles from './404.module.scss'

const Page404: FC = () => {
	return (
		<section className={styles.section}>
			<div>
				<div>
					<h2>
						<span>Error</span>404
					</h2>
					<p className={styles.p1}>Вибайте, але ця сторінка не знайдена</p>
					<p className={styles.p2}>Ви можете повренутись на головну сторінку</p>
					<Link href={'/'}>На головну</Link>
				</div>
			</div>
		</section>
	)
}

export default Page404
