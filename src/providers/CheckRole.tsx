import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { TypeComponentAuthFields } from '@/providers/private-route.interface'

import { useAuth } from '@/hooks/useAuth'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component: { isOnlyAdmin }
}) => {
	const { isLoading, user } = useAuth()
	const { replace, pathname } = useRouter()

	const Children = () => <>{children}</>

	if (isLoading) return null

	if (isOnlyAdmin) {
		if (user) {
			return <Children />
		} else pathname !== '/' && replace('/admin/login')
	} else return <Children />

	return null
}

export default CheckRole
