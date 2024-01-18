import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css';
import Home from './user/home';
import Login from './user/login';
import Sigin from './user/sigin';
import AddRecipe from './recipe/addRecipe';
import Homepage from './user/homepage';
import SiginTest from './user/test';
// import AllRecipe from './recipe/allRecipe';
import RecipePage from './recipe/recipe1';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* <Route path="/" element={<SiginTest />}/> */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sigin" element={<SiginTest />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/getCategory" element={<getCategory />} />
        {/* <Route path="allRecipe/" element={<AllRecipe />} /> */}
        <Route path="showRwcipe/" element={<RecipePage />} />
      </Routes>
    </>
  );
}

export default App;
