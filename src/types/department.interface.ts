import { IBase } from '@/types/base.interface'

export interface IDepartment extends IBase {
	city: string
	addresses: string[]
}
