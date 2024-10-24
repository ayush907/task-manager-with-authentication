import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import Protected from './components/auth/Protected'
import cookies from 'js-cookie';
import Graphs from './pages/Graphs'
import Sales from './pages/Sales'


const App = () => {

  const [islogIn, setislogIn] = useState(cookies.get('token'))

  // console.log("the cookie is", cookies.get('token'))

  useEffect(() => {
    if (cookies.get('token')) {
      setislogIn(cookies.get('token'));
    }
  }, []);

  // console.log("first islogin value is  ", islogIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected islogIn={islogIn} />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/sales" element={<Sales />} />
        </Route>

        <Route path="/" element={<Protected islogIn={!islogIn} redirect='/tasks'><Navigate to={"/signup"} /></Protected>} />
        <Route path="/signup" element={<Protected islogIn={!islogIn} redirect='/tasks'><Signup /></Protected>} />
        <Route path="/login" element={<Protected islogIn={!islogIn} redirect='/tasks'><Login setislogIn={setislogIn} /></Protected>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
