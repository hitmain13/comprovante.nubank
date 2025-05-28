'use client'
import { GetAllLocationsResponse } from '@/helpers/api/api-client'
import { useState } from 'react'

export function ListAllLocationsSection({ locations }: { locations: GetAllLocationsResponse[] }) {
  const [password, setPassword] = useState('')
  const [accessAllowed, setAccessAllowed] = useState(false)
  const [error, setError] = useState('')
  return (
    <Container>
      <Card>
        {!accessAllowed && (
          <PasswordInput
            password={password}
            setPassword={setPassword}
            setAccessAllowed={setAccessAllowed}
            error={error}
            setError={setError}
          />
        )}
        {accessAllowed && <LocationList locations={locations} />}
      </Card>
    </Container>
  )
}

function PasswordInput({
  password,
  setPassword,
  setAccessAllowed,
  error,
  setError,
}: {
  password: string
  setPassword: (password: string) => void
  setAccessAllowed: (accessAllowed: boolean) => void
  error: string
  setError: (error: string) => void
}) {
  const [blocked, setBlocked] = useState(false)
  const handleAccess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (blocked) return
    if (password !== process.env.NEXT_PUBLIC_LOCATION_PAGE_PASSWORD)
      setError('Senha inválida. Tente novamente.')
    setBlocked(true)
    setTimeout(() => {
      setBlocked(false)
      setError('')
    }, 500)
    if (password === process.env.NEXT_PUBLIC_LOCATION_PAGE_PASSWORD) {
      setAccessAllowed(true)
    }
  }

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleAccess}
      >
        <label htmlFor="password">Senha</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          type="submit"
        >
          Acessar
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
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
