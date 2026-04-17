import { Routes, Route } from "react-router-dom"
import { LoginForm } from "@/components/ui/form"
import Layout from "@/component/layout"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/layout" element={<Layout />} />
    </Routes>
  )
}

export default Router