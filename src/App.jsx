import React from 'react'
import AuthProvider from './auth//AuthProvider';
import Router from './Router'
import './App.css'
import { Navbar } from './Components/Navbar/Navbar'
import { Navbar2 } from './Components/Navbar/Navbar2'

function App() {
  return (
    <AuthProvider>
      <>
        <Navbar2 />
        <Router />
      </>
    </AuthProvider>
  )
}

export default App;