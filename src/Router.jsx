import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import AboutUs from './pages/AboutUs/AboutUs';
import CalendarPage from './pages/Calendar/Calendar';
import Instructions from './pages/Instructions/Instructions';
import Signup from './pages/SignUp/SignUp';
import Login from './pages/LogIn/LogIn';
import AdminClasses from './pages/AdminClasses/AdminClasses';
import UserClasses from './pages/UserClasses/UserClasses';

import Unauthorized from './Components/ProtectedRoute/Unauthorized'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'


function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/about-us"} element={<AboutUs />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/calendar"} element={<CalendarPage />} />
        <Route path={"/instructions"} element={<Instructions/>} />
        <Route path={"/unauthorized"} element={<Unauthorized />} />
        
        <Route path={"/userclasses"} element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserClasses />
            </ProtectedRoute>
          }
        />
        <Route path={"/adminclasses"} element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminClasses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;