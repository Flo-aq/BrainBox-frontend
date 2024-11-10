import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import AboutUs from './pages/AboutUs/AboutUs';
import Signup from './pages/SignUp/SignUp';
import Login from './pages/LogIn/LogIn';
import AdminCheck from './protected/AdminCheck'
import UserCheck from './protected/UserCheck'


function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/about-us"} element={<AboutUs />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/admincheck"} element={<AdminCheck />}/>
        <Route path={"/usercheck"} element={<UserCheck />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;