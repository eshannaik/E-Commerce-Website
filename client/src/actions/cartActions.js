import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from './types';

// dispatch is only way to trigger an action in redux
// payload is a kind of info to identify that particular thing

// to get all items in the cart
export const getCart = (id) => dispatch =>{
    dispatch(setCartLoading());
    axios.get('/api/cart/${id}')
        .then(res => dispatch ({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data,err.response.status)))
}

// add to cart
export const addToCart = (id,item,quantity) => (dispatch) => {
    axios.post('/api/cart/${id}',{item,quantity})
        .then(res => dispatch ({
            type: ADD_TO_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data,err.response.status)))
}

// deleting from cart
export const deleteFromCart = (id,item) => (dispatch) => {
    axios.delete('/api/cart/${id}/${item}')
        .then(res => dispatch ({
            type: DELETE_FROM_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data,err.response.status)))
}

// set type to cart loading
export const setCartLoading = () => {
    return{
        type:CART_LOADING
    }
}