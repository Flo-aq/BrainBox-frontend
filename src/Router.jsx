import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing';
import AboutUs from './pages/AboutUs/AboutUs';

function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing />}/>
        <Route path={"/about-us"} element={<AboutUs />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;