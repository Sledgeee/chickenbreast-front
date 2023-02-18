import { FC } from 'react'

import Layout from '@/components/layout/Layout'

import styles from './OurChickens.module.scss'

const OurChickens: FC = () => {
	return (
		<Layout title={'Наші кури'}>
			<div className={styles.head}>
				<video autoPlay muted loop playsInline>
					<source src={'/videos/background/chickens.mp4'} type={'video/mp4'} />
				</video>
				<div>
					<h3>
						<span>Чікенбрест</span>
					</h3>
					<h2>
						<span>НАШІ КУРИ</span>
					</h2>
				</div>
			</div>
		</Layout>
	)
}

export default OurChickens
