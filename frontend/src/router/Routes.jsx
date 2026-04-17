import { Routes, Route } from "react-router-dom"
import { LoginForm } from "@/components/ui/form"
import Layout from "@/component/layout"
import PrivateRoute from "./PrivateRoute"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      {/* <Route path="/layout" element={<Layout />} /> */}

         {/* Private Route */}
      <Route
        path="/layout"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default Router