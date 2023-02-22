import type { AppProps } from 'next/app'
import NextProgressBar from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import ReduxToastrLib from 'react-redux-toastr'
import { PersistGate } from 'redux-persist/integration/react'

import '@/assets/styles/globals.scss'

import { persistor, store } from '@/store/store'

export default function App({ Component, pageProps }: AppProps) {
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
				</PersistGate>
			</Provider>
		</>
	)
}
