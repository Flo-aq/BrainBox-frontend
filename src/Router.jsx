import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import AboutUs from './pages/AboutUs/AboutUs';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';

function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/about-us"} element={<AboutUs />} />
        <Route path={"/log-in"} element={<LogIn />} />
        <Route path={"/sign-up"} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;