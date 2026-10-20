import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./pages/home"
import { Login } from "./pages/Login"
import { Siroh } from "./pages/Siroh"
import { SirohRawForm } from "./pages/SirohRawForm"
function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<Login/>}></Route>

        {/* Protected routes */}
        <Route path="/" element={<Home/>}></Route>
        <Route path="/siroh" element={<Siroh/>}></Route>
        <Route path="/siroh-raw-Form" element={<SirohRawForm/>}></Route>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
