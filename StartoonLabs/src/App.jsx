import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter ,Routes,Route,Link} from 'react-router-dom'
import './App.css'
import SignUp from './assets/components/SignUp'
import SignIn from './assets/components/SignIn'
import User from'./assets/components/user'
import Admin from './assets/components/AdminDashboard'
function App() {
  return (
    <>
    <BrowserRouter>
      <div>
        <nav>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
          <li>
            <Link to="/SignIn">SignIn</Link>
          </li>
        </nav>
        <Routes>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/SignIn" element={<SignIn/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/admindashboard" element={<Admin/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
