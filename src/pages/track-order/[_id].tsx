import { GetServerSideProps, NextPage } from 'next'

import TrackedOrder from '@/components/pages/track-order/tracked-order/TrackedOrder'

import { IOrder } from '@/types/order.interface'

import { API_URL } from '@/api/ky'

const TrackedOrderPage: NextPage<{ order: IOrder }> = ({ order }) => {
	return <TrackedOrder order={order} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { _id } = query
	const response = await fetch(`${API_URL}/orders/${_id}`)
	const order = await response.json()

	return {
		props: {
			order
		}
	}
}

export default TrackedOrderPage
