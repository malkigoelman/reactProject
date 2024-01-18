import * as actionName from './action';

const Search = {
    Category: [],
    recipies:[],
    User: null,
    Difficult: ["קל","בינוני","קשה","קשה מאד"],
    selestRecipe: null,
    ListShopping: [],
}
export default function reducer(state = Search, action) {
    switch (action.type) {
        case actionName.ADD_CATEGORY: {
            let categories = [...action.categories];
            categories.push(action.data);
            return {
                ...state,
                categories
            }
        }
        case actionName.SET_CATEGORIES: {
            const categories = action.data;
            return {
                ...state,
                Category: categories
            }
        }
        case actionName.ADD_RECIPE: {
            let recipies = [...state.recipies];
            recipies.push(action.data);
            return {
                ...state,
                recipies
            }
        }
        case actionName.SET_RECIPES: {
            return {
                ...state,
               recipies: action.data
            }
        }
        case actionName.DELETE_RECIPE: {
            let recipies = [...state.recipies];
            recipies = recipies.filter(p => p.Id !== actionName.data.Id);
            return {
                ...state,
               recipies
            }
        }
        case actionName.EDIT_RECIPE: {
            let recipies = [...state.recipies];
            const x = recipies.findIndex(y => x.Id = action.data.Id);
            recipies[x] = action.data;
            return {
                ...state,
                recipies
            }
        }
        case action.SET_USER: {
            return {
                ...state,
                User: action.data
            }
        }
        case actionName.RELOAD: {
            return {
                ...state,
                Reload: true
            }
        }
        case actionName.SET_RECIPE_USER:
            {
                return{
                    ...state,
                    selestRecipe:action.data
                }
            }
        default: return { ...state,Difficult:[{Id:1,Name:'קל'},{Id:2,Name:'בינוני'},{Id:3,Name:'קשה '},{Id:4,Name:'קשה מאד'}] };
    }

}
