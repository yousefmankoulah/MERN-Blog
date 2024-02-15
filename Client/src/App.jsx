import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Dashboard } from "./pages/Dashboard"
import { Signin } from "./pages/SignIn"
import { Signup } from "./pages/Signup"
import { Projects } from "./pages/Projects"
import { Header } from './components/Header'
import { FooterComp } from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

export default function App () {
  return(
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projects" element={<Projects />} />

   
        </Routes>
        <FooterComp />
      </BrowserRouter>

    )
}