export const getUser = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export const getRole = () => {
  return getUser()?.role || null
}

