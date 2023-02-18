/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
	env: {
		AUTH_MICRO_URL: process.env.AUTH_MICRO_URL,
		SHOP_MICRO_URL: process.env.SHOP_MICRO_URL,
		APP_NAME: process.env.APP_NAME
	},
	images: {
		domains: ['localhost'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	},
	webpack: config => {
		const rules = config.module.rules
			.find(rule => typeof rule.oneOf === 'object')
			.oneOf.filter(rule => Array.isArray(rule.use))
		rules.forEach(rule => {
			rule.use.forEach(moduleLoader => {
				if (
					moduleLoader.loader !== undefined &&
					moduleLoader.loader.includes('css-loader') &&
					typeof moduleLoader.options.modules === 'object'
				) {
					moduleLoader.options = {
						...moduleLoader.options,
						modules: {
							...moduleLoader.options.modules,
							exportLocalsConvention: 'camelCase'
						}
					}
				}
			})
		})

		return config
	}
}

module.exports = nextConfig
