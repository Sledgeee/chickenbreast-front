import { $ky } from '@/api/ky'

export const AuthService = {
	async login(email: string, password: string) {
		const response = await $ky.post('/auth/login', {
			json: {
				email,
				password
			}
		})
		return await response.json()
	},

	async register(
		firstName: string | undefined,
		lastName: string | undefined,
		email: string,
		password: string
	) {
		const response = await $ky.post('/auth/register', {
			json: {
				email,
				password
			}
		})
		return await response.json()
	},

	async logout(accessToken: string) {
		await $ky.post('/auth/logout', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
	}
}
