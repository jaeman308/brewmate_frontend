import { useState, createContext, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import CoffeelogForm from './components/CoffeelogForm/CoffeelogForm';
import Coffeeloglist from './components/CoffeeLogList/CoffeeLogList';
import CoffeelogDetails from './components/CoffeelogDetail/CoffeelogDetails';
import * as authService from '../src/services/authService'
import * as coffeelogService from '../src/services/coffeelogService';
import './App.css'

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [coffeelogs, setCoffeelogs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect (() => {
    const fetchAllCoffeelogs = async () => {
      const coffeelogData = await coffeelogService.index();
      setCoffeelogs(coffeelogData);
    };
    if (user) fetchAllCoffeelogs();
  }, [user]);
  
const navigate = useNavigate();


const handleAddCoffeelog = async (coffeelogFormData) => {
  setIsSubmitting(true);
  try {
    const newCoffeelog = await coffeelogService.create(coffeelogFormData);
      setCoffeelogs((prevCoffeelogs) => [newCoffeelog, ...prevCoffeelogs]);
      navigate('/coffeelogs');
    }catch (error) {
      console.error('Error adding coffee log:', error);
    }finally {
      setIsSubmitting(false);
    }
};

const handleUpdateCoffeelog = async (coffeelogId, coffeelogFormData) => {
  setIsSubmitting(true);
  try{
    const updateCoffeelog = await coffeelogService.updateCoffeelog(coffeelogId, coffeelogFormData);
    setCoffeelogs(coffeelogs.map((coffeelog) => (coffeelogId === coffeelog._id ? updateCoffeelog : coffeelog)));
    navigate(`/coffeelogs/${coffeelogId}`);
  }catch (error) {
    console.error('Error updating coffee log:', error);
  } finally {
    setIsSubmitting(false);
  }
};

const handleDeleteCoffeelog = async (coffeelogId) => {
  try {
    const deletedCoffeelog = await coffeelogService.deleteCoffeelog(coffeelogId);
    setCoffeelogs(coffeelogs.filter((coffeelog) => coffeelog._id !== deletedCoffeelog._id))
    navigate('/coffeelogs');
   }catch (error) {
    console.error('Error deleting coffee log:', error);
    
   }
};


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
        <Route path="/coffeelogs" element={<Coffeeloglist coffeelogs={coffeelogs}/>}/>
        <Route path="/coffeelogs/:coffeelogId" element={<CoffeelogDetails handleDeleteCoffeelog={handleDeleteCoffeelog}/>} />
        <Route path="/coffeelogs/New" element={<CoffeelogForm handleAddCoffeelog={handleAddCoffeelog} isSubmitting={isSubmitting}/>} />
        <Route path="/coffeelogs/:coffeelogId/edit" element={<CoffeelogForm handleUpdateCoffeelog={handleUpdateCoffeelog} isSubmitting={isSubmitting} />} />
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
