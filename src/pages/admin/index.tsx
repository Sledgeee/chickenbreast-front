import type { GetStaticProps } from 'next'

import Admin from '@/components/pages/admin/Admin'
import { IAdminPage } from '@/components/pages/admin/admin.interface'

import { NextPageAuth } from '@/providers/private-route.interface'

const AdminPage: NextPageAuth<IAdminPage> = () => {
	return <Admin />
}

AdminPage.isOnlyAdmin = true

export const getStaticProps: GetStaticProps = async () => {
	try {
		return {
			props: {} as IAdminPage
		}
	} catch (e) {
		return {
			props: {} as IAdminPage
		}
	}
}

export default AdminPage
