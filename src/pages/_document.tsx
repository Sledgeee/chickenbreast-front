import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='icon' href='/favicon.ico' type='image/x-icon' />
				<meta name='viewport' content='viewport-fit=cover' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
