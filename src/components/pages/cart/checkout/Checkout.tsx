import { FC } from 'react'

import Layout from '@/components/layout/Layout'

import { useActions } from '@/hooks/useActions'

const Checkout: FC = () => {
	const { clearCart } = useActions()

	return (
		<Layout title={'Оформлення замовлення'}>
			<div>Checkout</div>
		</Layout>
	)
}

export default Checkout
