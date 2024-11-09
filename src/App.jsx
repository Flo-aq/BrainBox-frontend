import React from 'react'
import { AuthProvider } from './auth//AuthProvider'; 
import Router from './Router'
import './App.css'
import { Navbar } from './Components/Navbar/Navbar'

function App() {
  return (
    <AuthProvider>
      <>
        <Navbar/>
        <Router />
      </>
    </AuthProvider>
  )
}

export default App;