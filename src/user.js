const apiUrl = process.env.REACT_APP_READ_PROFILE_URL

export const fetchUser = async (accessToken) => {
  try {
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return await res.json()
  } catch (err) {
    return undefined
  }
}

export const updateUser = async (accessToken, profile) => {
  try {
    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(profile)
    })
    return await res.json()
  } catch (err) {
    return undefined
  }
}
