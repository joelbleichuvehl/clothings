import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'

export function RotasPublicas() {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
    </Routes>
  )
}
