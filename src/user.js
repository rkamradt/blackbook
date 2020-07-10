export const fetchUser = async (accessToken) => {
  try {
    const apiUrl = process.env.REACT_APP_READ_PROFILE_URL
    return await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((res) => res.json())
  } catch(err) {
    return undefined
  }
}
