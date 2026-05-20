import { Navigate } from "react-router-dom"
import { getRole } from "../utils/auth"

const RoleRoute = ({ children, allowedRoles }: any) => {
  const role = getRole()

  if (!role) {
    return <Navigate to="/" />
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/layout/dashboard" />
  }

  return children
}

export default RoleRoute