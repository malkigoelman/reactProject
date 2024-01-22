import axios from "axios";
import * as action from '../store/action';
export const getRecipe=()=>{
    return dispatch=>{
        axios.get('http://localhost:8080/api/recipe').
        then(x=>{ dispatch({type:action.SET_RECIPES,data:x.data})})
        .catch(x=>{
            console.log(x);
        });
    }
}

export const addRecipe=(recipe)=>{
    return axios.post('http://localhost:8080/api/recipe',recipe)
}

export const editRecipe=(recipe)=>{
    return axios.post('http://localhost:8080/api/recipe/edit',recipe)
}

export const deleteRecipe=(recipeId)=>{
    return axios.post(`http://localhost:8080/api/recipe/delete/${recipeId}`)
}