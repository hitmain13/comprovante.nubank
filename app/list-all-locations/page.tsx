import { cookies } from 'next/headers'
import { verifyJwt } from '@/helpers/jwt'
import { ApiClient } from '@/helpers/api/api-client'
import { ListAllLocationsSection } from './password-input'
import PasswordForm from './PasswordForm'

export default async function ListAllLocationsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('locations_jwt')?.value
  const isAuthenticated = !!(token && verifyJwt(token))

  if (!isAuthenticated) {
    return <PasswordForm />
  }

  const apiClient = new ApiClient()
  const locations = await apiClient.getAllLocations()
  if (!locations.success) {
    return <div>Error: {locations.error}</div>
  }
  return <ListAllLocationsSection locations={locations.data} />
}
