import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'

import styles from './Home.module.scss'

const Home: FC = () => {
	const IMG_PATH = '/images/products/preview'
	const productPreviewImages = [
		IMG_PATH + '/1.png',
		IMG_PATH + '/2.png',
		IMG_PATH + '/3.png'
	]

	return (
		<Layout title={'Головна'}>
			<div className={`${styles.wrapper} ${styles.introBlock}`}>
				<div className={styles.container}>
					<div className={styles.intro}>
						<div className={styles.introTextBlock}>
							<h4>
								<span>У гонитві за</span>
							</h4>
							<h1>
								<span>Здоровою</span>
							</h1>
							<h4>
								<span>Їжею</span>
							</h4>
						</div>
						<div className={styles.introTextBlock}>
							<p>
								<span>
									Компанія &quot;Чікенбрест&quot; вирощує місцеву курятину за
									допомогою фермерів з Мічигану та Індіани з 1974 року. Наші
									пташники сертифіковані Глобальним партнерством тварин для
									забезпечення суворих стандартів добробуту тварин, і ми робимо
									все можливе, щоб отримувати інгредієнти для кормів від
									місцевих фермерів, щоб мінімізувати наш вуглецевий слід і
									гарантувати, що наші курчата отримують раціон на основі
									кукурудзи та сої без антибіотиків, гормонів, стероїдів або
									штучних барвників.
								</span>
							</p>
						</div>
						<Link href={'/retail'} className={styles.introButton}>
							<span>Перейти в каталог</span>
						</Link>
					</div>
				</div>
			</div>
			<div className={`${styles.wrapper} ${styles.productsBlock}`}>
				<div className={styles.container}>
					<div className={styles.products}>
						<div className={styles.productsTextBlock}>
							<h3>
								<span>Якісна курятина</span>
							</h3>
							<h2>
								<span>Відчуй різницю</span>
							</h2>
						</div>
						<div className={styles.productsTextBlock}>
							<p>
								<span>
									Обирайте курятину, вирощену на сімейних фермах, для свого
									сімейного столу сьогодні ввечері. Наша курятина обробляється з
									максимальною ефективністю від початку до кінця, і різницю ви
									можете відчути на смак.
								</span>
							</p>
						</div>
						<div className={styles.productsPreviews}>
							{productPreviewImages.map((value, index) => (
								<Image
									width={275}
									height={200}
									src={value}
									alt={'img' + index}
									key={index}
								/>
							))}
						</div>
						<div className={styles.productsGoToShop}>
							<div>
								<Link href={'/retail'} className={styles.introButton}>
									<span>Перейти в каталог</span>
								</Link>
							</div>
							<Image
								width={350}
								height={350}
								src={'/images/background/rosemary.png'}
								alt={'rosemary'}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.wrapper} ${styles.recipesBlock}`}>
				<div className={styles.container}>
					<div className={styles.recipes}>
						<div className={styles.recipesPlaceholder}></div>
						<div className={styles.recipesTextBlock}>
							<h3>
								<span>Перенесіть ресторан додому</span>
							</h3>
							<h2>
								<span>Тако з куркою на грилі</span>
							</h2>
							<p>
								<span>
									Ми знаємо, що ви бажаєте лише найкращого для своєї родини,
									коли справа доходить до домашньої їжі! Наша курка ніжна та
									делікатна, залишаючись соковитою та насиченою смаком –
									ідеально підходить для таких рецептів, як ця смачна страва з
									курки-гриль тако!
								</span>
							</p>
							<Link href={'/recipes'} className={styles.introButton}>
								<span>Отримати рецепт</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.wrapper} ${styles.wtbBlock}`}>
				<div className={styles.container}>
					<div className={styles.wtb}>
						<div className={styles.wtbTextBlock}>
							<h3>Де купити</h3>
							<h2>Спробуйте</h2>
						</div>
						<Link href={'/retail'} className={styles.introButton}>
							<span>Перейти в каталог</span>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Home
