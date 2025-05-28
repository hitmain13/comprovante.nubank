import { ApiClient, GetAllLocationsResponse } from '@/helpers/api/api-client'
import { ListAllLocationsSection } from './password-input'

export default async function ListAllLocationsPage() {
  const apiClient = new ApiClient()
  const locations = await apiClient.getAllLocations()
  return <ListAllLocationsSection locations={locations} />
}
