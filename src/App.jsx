import { useState, createContext, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard'
import * as authService from '../src/services/authService'
import *as coffeelogService from '../src/services/coffeelogService';
import CoffeeBeans from "./components/CoffeelogDetail/CoffeeBeans";
import CoffeeShops from "./components/CoffeelogDetail/CoffeeShops";
import CoffeeRecipes from "./components/CoffeelogDetail/coffeeRecipes";
import CoffeelogForm from './components/CoffeelogForm/CoffeelogForm';
import './App.css'

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  
  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }
  const navigate = useNavigate();
  
  return (
    <>
    <AuthedUserContext.Provider value={user}>
    <NavBar user={user}  handleSignout={handleSignout}/>
    <Routes>
      {user ? (
        <>
        <Route path="/" element={<Dashboard user={user}/>}/>
        <Route path="/coffee-beans" element={<CoffeeBeans />}/>
        <Route path="/coffee-shops" element={<CoffeeShops />}/>
        <Route path="/coffee-recipes" element={<CoffeeRecipes />}/>
        <Route path="/coffeelogs/New" element={<CoffeelogForm />} />
        </>
      ): (
        <Route path="/" element={<Landing />} />
      )}
      <Route path='/signup' element={<SignupForm  setUser={setUser}/>} />
      <Route path='/signin' element={<SigninForm setUser={setUser}/>}/>
    </Routes>
    </AuthedUserContext.Provider>
    </>
  )
};

export default App
