import * as actionName from './action';

const Search = {
    Category: [],
    Recipies:[],
    User: null,
    Difficult: [],
    SelestRecipe: null,
    ListShopping: [],
}
export default function reducer(state = Search, action) {
    switch (action.type) {
        case actionName.ADD_CATEGORY: {
            let categories = [...state.categories];
            categories.push(action.data);
            return {
                ...state,
                categories
            }
        }
        case actionName.SET_CATEGORY: {
            const categories = [...state.categories];
            return {
                ...state,
                categories
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
        case actionName.SET_RECIPES: {
            return {
                ...state,
                Recipe: action.data
            }
        }
        case action.SET_USER: {
            return {
                ...state,
                User: action.data
            }
        }
        // case actionName.RELOAD: {
        //     return {
        //         ...state,
        //         Reload: true
        //     }
        // }
        case actionName.SET_RECIPE_USER:
            {
                return{
                    ...state,
                    SelestRecipe:actionName.data
                }
            }
        default: return { ...state };
    }

}
