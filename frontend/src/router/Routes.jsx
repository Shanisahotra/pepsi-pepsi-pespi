import { Routes, Route } from "react-router-dom"
import { LoginForm } from "@/components/ui/form"
import Layout from "@/component/layout"
import PrivateRoute from "./PrivateRoute"
import UsersTable from "../component/UsersTable"
import Dashboard from "../component/Dashboard"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
    
  {/* Private Layout */}
      <Route
        path="/layout"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* Nested Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UsersTable />} />
      </Route>
    </Routes>
  )
}

export default Router