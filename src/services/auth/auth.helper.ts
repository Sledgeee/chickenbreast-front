import { IAdmin } from '@/types/admin.interface'

export interface IAuthData {
	user: IAdmin | null
	accessToken: ''
}
