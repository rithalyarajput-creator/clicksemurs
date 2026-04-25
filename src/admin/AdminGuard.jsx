import { Navigate } from 'react-router-dom'
import { useAdminAuth } from './useAdminAuth'
import AdminLayout from './AdminLayout'

export default function AdminGuard({ children }) {
  const { isLoggedIn } = useAdminAuth()
  if (!isLoggedIn) return <Navigate to="/admin/login" replace />
  return <AdminLayout>{children}</AdminLayout>
}
