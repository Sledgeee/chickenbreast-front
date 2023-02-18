import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'

import { TypeComponentAuthFields } from '@/providers/private-route.interface'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
	ssr: false
})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyAdmin },
	children
}) => {
	return !isOnlyAdmin ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyAdmin }}>{children}</DynamicCheckRole>
	)
}

export default AuthProvider
