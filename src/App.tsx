
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/LayoutRoot'
import AdminLayout from './layout/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminHotels from './pages/admin/AdminHotels'
import AdminBookings from './pages/admin/AdminBookings'
import AdminUsers from './pages/admin/AdminUsers'
import Destination from './pages/Destination'

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
            <Route path="destination/:city" element={<Destination/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="profile" element={<Profile/>}/>
          </Route>  
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='hotels' element={<AdminHotels />} />
            <Route path='bookings' element={<AdminBookings />} />
            <Route path='users' element={<AdminUsers />} />
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
