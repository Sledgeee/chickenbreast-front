import ky from 'ky'

import { getContentType } from '@/utils/api.utils'

export const API_URL = process.env.API_URL

export const $ky = ky.create({
	prefixUrl: API_URL,
	credentials: 'include',
	headers: getContentType()
})
