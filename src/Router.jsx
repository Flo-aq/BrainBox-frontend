import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import AboutUs from './pages/AboutUs/AboutUs';


import CalendarPage from './pages/Calendar/Calendar';
import Instructions from './pages/Instructions/Instructions';
import Signup from './pages/SignUp/SignUp';
import Login from './pages/LogIn/LogIn';
import AdminCheck from './protected/AdminCheck'
import UserCheck from './protected/UserCheck'
import AdminClasses from './pages/AdminClasses/AdminClasses';
import UserClasses from './pages/UserClasses/UserClasses';


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
        <Route path={"/adminclasses"} element={<AdminClasses/>} />
        <Route path={"/admincheck"} element={<AdminCheck />}/>
        <Route path={"/usercheck"} element={<UserCheck />}/>
        <Route path={"/userclasses"} element={<UserClasses />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default Router;