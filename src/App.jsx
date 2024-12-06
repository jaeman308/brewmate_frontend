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
  const [coffeelogs, setCoffeelogs] = useState([]);

  useEffect (() => {
    const fetchAllCoffeelogs = async () => {
      const coffeelogData = await coffeelogService.index();
      setCoffeelogs(coffeelogData);
    }
    if(user) fetchAllCoffeelogs();
  }, [user]);

const navigate = useNavigate();

const handleAddCoffeelog = async (coffeelogFormData) => {
  const newCoffeelog = await coffeelogService.create(coffeelogFormData);
    setCoffeelogs((prevCoffeelogs) => [newCoffeelog, ...(Array.isArray(prevCoffeelogs) ? prevCoffeelogs : [])]);
    navigate('/');
}

const handleDeleteCoffeelog = async (coffeelogFormData) => {
  const deletedCoffeelog = await coffeelogService.deletedCoffeelog(coffeelogId);
  setCoffeelogs(coffeelogs.filter((coffeelog) => coffeelog._id !== deletedCoffeelog._id))
  navigate('/');
};

const handleUpdateCoffeelog = async (coffelogId, coffeelogFormData) => {
  const updateCoffeelog = await coffeelogService.updateCoffeelog(coffelogId, coffeelogFormData);

  setCoffeelogs(coffeelogs.map((coffeelog) => (coffeelogId === coffeelog._id ? updateCoffeelog : coffeelog)));
  navigate('/');
}
  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }
  
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
        <Route path="/coffeelogs/New" element={<CoffeelogForm handleAddCoffeelog={handleAddCoffeelog}/>} />
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
