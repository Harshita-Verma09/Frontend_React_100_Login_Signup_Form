import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Redirect default route to signup */}
        <Route path="*" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
