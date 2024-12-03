import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import './App.css'

const App = () => {
  const [user, setUser] = useState(null);
  
  return (
    <>
    <NavBar user={user} />
    <h1>Welcome to the BrewMate!</h1>

    </>
  )
}
export default App
