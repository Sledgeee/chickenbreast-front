import ky from 'ky'

import { getContentType } from '@/utils/api.utils'

//export const API_URL = process.env.API_URL
export const API_URL = 'http://localhost:8000'
export const $ky = ky.create({
	prefixUrl: API_URL
})

export const $kyAuthenticated = $ky.extend({
	credentials: 'include',
	headers: getContentType()
})
