import Image from 'next/image'
import { FC, useState } from 'react'

import Layout from '@/components/layout/Layout'
import { IRetail } from '@/components/pages/retail/retail.interface'

import { IProduct } from '@/types/product.interface'

import styles from './Retail.module.scss'
import { API_URL } from '@/api/ky'

const Retail: FC<IRetail> = ({ data }) => {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<Layout title={'Магазин'}>
			<div className={styles.head}>
				<h3>
					<span>Чікенбрест</span>
				</h3>
				<h2>
					<span>МАГАЗИН</span>
				</h2>
			</div>
			<div className={styles.shopArea}>
				{data?.map((data, index) => {
					if (data.products.length > 0) {
						return (
							<div className={styles.category} key={'c' + index}>
								<div className={styles.title}>
									<h1>{data.category}</h1>
									<div></div>
								</div>
								<div className={styles.cards}>
									{data.products?.map((prod, index) => (
										<ProductCard key={index} prod={prod} />
									))}
								</div>
							</div>
						)
					}
				})}
			</div>
		</Layout>
	)
}

const ProductCard: FC<{ prod: IProduct }> = ({ prod }) => {
	return (
		<div id={prod._id} className={styles.card} onClick={() => {}}>
			<Image width={300} height={300} src={API_URL + prod.image} alt={'img'} />
			<div>{prod.name}</div>
			<div>{prod.price} ₴</div>
		</div>
	)
}

export default Retail
