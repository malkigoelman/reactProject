import axios from "axios";

//פלסטר שברכי שמה לשאלות לפנות אליה
export const data = "";
export const SET_USER = "SET_USER";

export const SET_RECIPES = "SET_RECIPES";
export const SET_RECIPE_USER = "SET_RECIPE_USER";
export const ADD_RECIPE = "ADD_RECIPE";
export const EDIT_RECIPE = "EDIT_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const SET_CATEGORY = "SET_CATEGORY";

export const ADD_PRODUCT="ADD_PRODUCT";

export const RELOAD = "RELOAD";

export const GetRecipies = () => {

    return dispatch => {
        dispatch({ type: "RELOAD" });

        axios.get("https://jsonplaceholder.typicode.com/recipes").then(
            x => setTimeout(() => dispatch({ type: "SET_USER", data: x.data[0] }), 200)
        )
    }
}
