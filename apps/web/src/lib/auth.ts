export async function getCurrentUser() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`,
    {
      credentials: 'include',
    }
  )

  if (!response.ok) {
    return null
  }

  return response.json()
}
