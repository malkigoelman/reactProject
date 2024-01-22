import * as actionName from './action';

const Search = {
    Category: [],
    recipies: [],
    user: null,
    Difficulty: [],
    selectRecipe: null,
    ListShopping: []
}
export default function reducer(state = Search, action) {
    switch (action.type) {
        case actionName.SET_CATEGORIES: {
            const categories = action.data;
            return {...state, Category: categories }
        }
        case actionName.SET_RECIPES:
            {
                return { ...state, recipies: action.data };
            }
        case actionName.ADD_PRODUCT: {
            let x = [state.ListShopping]
            x.push(action.data)
            return { ...state, ListShopping:x}
        }
        case actionName.UPDATE_PRODUCT: {
            let x = state.ListShopping;
            x[action.index] = action.data;
            return { ...state, ListShopping: x }
        }
        case actionName.SET_PRODUCT:{
            return{...state,ListShopping:action.data}
        }
        case actionName.DELETE_PRODUCT: {
            let x = [];
            x = state.ListShopping;
            x = x.filter(x => x.Id !== action.Id);
            return {...state,ListShopping:x}
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
        // case actionName.EDIT_RECIPE: {
        //     let recipies = [...state.recipies];
        //     const x = recipies.findIndex(y => x.Id = action.data.Id);
        //     recipies[x] = action.data;
        //     return {
        //         ...state,
        //         recipies
        //     }
        // }
        case actionName.SET_USER: {
            return {
                ...state,
                user: action.data
            }
        }
        case actionName.SET_RECIPE_USER:
            {
                return { ...state, selectRecipe: action.data }
            }
        default: return { ...state, Difficulty: [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה ' }, { Id: 4, Name: 'קשה מאד' }] };
    }

}
