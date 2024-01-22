import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css';
import Home from './user/home';
import Login from './user/login';
import Sigin from './user/sigin';
import AddRecipe from './recipe/addRecipe';
// import Homepage from './user/homepage';
// import SiginTest from './user/test';
// import AllRecipe from './recipe/allRecipe';
import RecipePage from './recipe/recipe1';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as actions from './store/action';
import AllRecipe from './recipe/allRecipe';
import CardRecipe from './recipe/CardRecipe';
import Shopping from './shopping/shopping';
function App() {

  const dispatch=useDispatch();
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/category`).
    then(x=>{
      dispatch({type:actions.SET_CATEGORIES, data:x.data})
    })
    .catch(x=>{
    });
  },[])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />} />
        <Route path='shopping' element={<Shopping/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/sigin" element={<Sigin />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/getCategory" element={<getCategory />} />
        <Route path="/allRecipe" element={<AllRecipe />} />
        <Route path="/recipe1" element={<RecipePage />} />
        <Route path="/CardRecipe" element={<CardRecipe />} />
      </Routes>
    </>
  );
}

export default App;
