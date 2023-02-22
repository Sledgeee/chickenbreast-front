import { GetServerSideProps, NextPage } from 'next'

import TrackOrder from '@/components/pages/track-order/TrackOrder'

import { IOrder } from '@/types/order.interface'

import { API_URL } from '@/api/ky'

const TrackOrderPage: NextPage<{ order: IOrder }> = ({ order }) => {
	return <TrackOrder order={order} />
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

export default TrackOrderPage
