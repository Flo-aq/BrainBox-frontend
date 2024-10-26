import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import AboutUs from './pages/AboutUs/AboutUs';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';
import CalendarPage from './pages/Calendar/Calendar';
import Instructions from './pages/Instructions/Instructions';

function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/about-us"} element={<AboutUs />} />
        <Route path={"/log-in"} element={<LogIn />} />
        <Route path={"/sign-up"} element={<SignUp />} />
        <Route path={"/calendar"} element={<CalendarPage />} />
        <Route path={"/instructions"} element={<Instructions/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;