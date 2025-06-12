import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../views/Home/Home"
import { Login } from "../views/Login/Login"
import { Register } from "../views/Register/Register"
import { Dashboard } from "../views/Dashboard/Dashboard"

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<h2>No se encuentra la página</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }