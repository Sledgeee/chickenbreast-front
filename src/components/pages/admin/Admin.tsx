import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import { IAdminPage } from '@/components/pages/admin/admin.interface'

const Admin: FC<IAdminPage> = () => {
	return <Layout title={'Панель'}></Layout>
}

export default Admin
