
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/LayoutRoot'

import Contact from './pages/Contact'
import Home from './pages/Home'
import Hotels from './pages/Hotels'
import HotelDetail from './pages/HotelDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
          <Route path='/' element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="hotels" element={<Hotels/>}/>
            <Route path="hotel/:id" element={<HotelDetail/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="profile" element={<Profile/>}/>
          </Route>
          
      </>
    )
  )
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
