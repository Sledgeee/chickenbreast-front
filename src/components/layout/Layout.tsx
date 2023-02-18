import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'

import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'

const Layout: FC<PropsWithChildren<{ title: string }>> = ({
	title,
	children
}) => {
	return (
		<>
			<Head>
				<title>
					{title} - {process.env.APP_NAME}
				</title>
			</Head>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default Layout
