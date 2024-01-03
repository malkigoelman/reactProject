import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css';
import Home from './user/home';
import Login from './user/login';
import Sigin from './user/sigin';
import AddRecipe from './recipe/addRecipe';
import Homepage from './user/homepage';
// import SiginTest from './user/test';
import AllRecipe from './recipe/allRecipe';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/sigin" element={<SiginTest />} /> */}
        <Route path="/sigin" element={<Sigin />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/homepage" element={<Homepage />} />
        {/* <Route path="/getCategory" element={<getCategory />} /> */}
        <Route path="allRecipe/" element={<AllRecipe />} />
      </Routes>
    </>
  );
}

export default App;
