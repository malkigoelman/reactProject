import axios from "axios";
import * as action from '../store/action';

export const getProducts = (userId) => {
    console.log("getProd", userId);
    return dispatch => {
        axios.get(`http://localhost:8080/api/bay/${userId}`)
            .then(x => dispatch({ type: action.SET_PRODUCT, data: x.data }))
            .catch(x => console.log(x))
    }

}

export const addProduct = (product) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, product)
            .then(x => {
                dispatch({ type: action.ADD_PRODUCT, data: x.data })

            })
            .catch(x => console.log(x))
    }
}

export const updateProduct = (product, i) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, product)
            .then(x => {
                dispatch({ type: action.UPDATE_PRODUCT, data: x.data, index: i })

            })
            .catch(x => console.log("😀"));
    }
}
export const deleteProduct = (product) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay/delete/${product}`)
            .then(x => {
                dispatch({ type: action.DELETE_PRODUCT, id: product })

            })
            .catch(x => console.log("delete error"))
    }
}