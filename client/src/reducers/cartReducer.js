import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from '../actions/types';

const initState = {
    cart: null,
    laoding: false
}

export default function(state=initState,action){
    switch(action.payload){
        case GET_CART:
            return{
                ...state,
                cart: action.payload,
                loading: false
            }
        case ADD_TO_CART:
            return{
                ...state,
                cart: action.payload
            }
        case DELETE_FROM_CART:
            return{
                ...state,
                cart: action.payload
            }
        case CART_LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}