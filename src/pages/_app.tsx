import type { AppProps } from 'next/app'
import NextProgressBar from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import ReduxToastrLib from 'react-redux-toastr'
import { PersistGate } from 'redux-persist/integration/react'

import AuthProvider from '@/providers/AuthProvider'
import { TypeComponentAuthFields } from '@/providers/private-route.interface'

import '@/assets/styles/globals.scss'

import { persistor, store } from '@/store/store'

type TypeAppProps = AppProps & TypeComponentAuthFields

export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<>
			<NextProgressBar
				color={'#2e3192'}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<AuthProvider Component={Component}>
						<Component {...pageProps} />
						<ReduxToastrLib
							timeOut={4000}
							newestOnTop={false}
							preventDuplicates
							progressBar
							closeOnToastrClick
							transitionIn='fadeIn'
							transitionOut='fadeOut'
						/>
					</AuthProvider>
				</PersistGate>
			</Provider>
		</>
	)
}
