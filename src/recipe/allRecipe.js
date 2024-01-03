// import axios from "axios";
// import { Image } from "../pages/img/logo.png";
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import * as yup from "yup";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function AllRecipe(recipe) {
    const [Category, useCategory] = useState([]);
    const [recipies, useRecipies] = useState([]);
    const [SelectCategory, useSelectCategory] = useState([]);
    const [SelectDuration, useSelectDuration] = useState([]);
    const [SelectDifficulty, useSelevtDifficulth] = useState([]);
    const [UserRecipies, userRecipies] = useState([]);
    // const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!recipe) {
            // axios.get('http://localhost:8080/api/recipe').then(
            // (x) => { useRecipies(r.data); })
            // console.log(recipe);
        }
        else {
            // axios.get('http://localhost:8080/api/recipe').then(
            // (x) => { useRecipies(r.data.filter((x) => x.userId == user?.Id)) }
            // )
        }
        // axios.get('http://localhost:8080/api/recipe').then(
        // (x) => useCategory(x.data));
    }, []);


    //וןעדכון מתכ
    // axios.get('http://localhost:8080/api/recipe/edit')
    //קבלת קטגוריות
    // axios.get('http://localhost:8080/api/category')
    //הוספת קטגוריה
    // axios.post('http://localhost:8080/api/category', { Id: data.Id, Name: data.Name })//אני צריכה  לקבל את האוביקט החדש

    return (
        <>
            {/* <img src={Image}></img><br/> */}


            <button onClick={() => (navigate('/addRecipe'), { state: null })}>להוספת מתכון</button>

        </>
    );


}