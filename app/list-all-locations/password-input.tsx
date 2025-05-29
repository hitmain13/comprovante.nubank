import { GetAllLocationsResponse } from '@/helpers/api/api-client'
import { logout } from '@/helpers/api/logout'

export function ListAllLocationsSection({ locations }: { locations: GetAllLocationsResponse[] }) {
  return (
    <Container>
      <Card>
        <LocationList locations={locations} />
      </Card>
    </Container>
  )
}

const LocationList = ({ locations }: { locations: GetAllLocationsResponse[] }) => {
  return (
    <>
      <h1 className="text-2xl font-bold">Listagem de transações</h1>
      {locations?.length === 0 ? (
        <p>Não há transações</p>
      ) : (
        <>
          <div className="flex flex-col items-center justify-between my-4 gap-4">
            <h2 className="text-lg font-bold">Total de transações: {locations.length}</h2>
          </div>
          <ul className="flex flex-col gap-4">
            {locations?.map((location) => (
              <li key={location.id}>
                <div>
                  <p>Hash: {location.hash}</p>
                  <p>Latitude: {location.latitude}</p>
                  <p>Longitude: {location.longitude}</p>
                  {location.altitude && <p>Altitude: {location.altitude}</p>}
                  {location.altitudeAccuracy && (
                    <p>Altitude Accuracy: {location.altitudeAccuracy}</p>
                  )}
                  {location.heading && <p>Heading: {location.heading}</p>}
                  {location.speed && <p>Speed: {location.speed}</p>}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </>
  )
}

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 p-4 m-4 border border-gray-300 rounded-md shadow-md">
      {children}
    </div>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 flex flex-col items-center">{children}</div>
}
