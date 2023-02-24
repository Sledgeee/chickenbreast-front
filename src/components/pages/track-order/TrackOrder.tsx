import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import Layout from '@/components/layout/Layout'

import styles from './TrackOrder.module.scss'

const TrackOrder: FC = () => {
	const [id, setId] = useState('')
	const router = useRouter()
	const [errored, setErrored] = useState(false)

	return (
		<Layout title={'Відстежити замовлення'}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<h1>Відстежте Ваше Замовлення</h1>
					<h2>Для цього введіть його ідентифікатор і натисніть відстежити</h2>
					<div className={styles.area}>
						<input
							type={'text'}
							placeholder={'Ідентифікатор...'}
							value={id}
							onChange={event => {
								setId(event.target.value)
								if (!event.target.value) {
									setErrored(true)
									return
								} else setErrored(false)
							}}
							className={`${errored ? styles.error : ''}`}
						/>
						<button
							onClick={async () => {
								if (!id || id.length < 24) {
									setErrored(true)
									return
								}
								await router.push(`/track-order/${id}`)
							}}
						>
							Відстежити
						</button>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default TrackOrder
