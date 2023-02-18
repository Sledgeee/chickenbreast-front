import type { GetStaticProps, NextPage } from 'next'

import Home from '@/components/pages/home/Home'

const HomePage: NextPage = () => {
	return <Home />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		return {
			props: {}
		}
	} catch (e) {
		return {
			props: {}
		}
	}
}

export default HomePage
