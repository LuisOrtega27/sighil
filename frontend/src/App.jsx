import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Siroh } from "./pages/Siroh"
import { SirohRawForm } from "./pages/SirohRawForm"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./ProtectedRoute"
function App() {

  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/login" element={<Login/>}></Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/siroh" element={<Siroh/>}></Route>
            <Route path="/siroh-raw-Form" element={<SirohRawForm/>}></Route>
          </Route>
        
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
