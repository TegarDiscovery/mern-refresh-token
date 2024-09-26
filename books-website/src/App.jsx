import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import Books from "./pages/Books/Books"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={<Books />} />
    </Routes>
  )
}

export default App
