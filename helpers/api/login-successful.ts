export const loginSuccessful = async () => {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    console.error('Login failed')
  }

  const data = await response.json()
  return data
}
