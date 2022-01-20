import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from '../actions/types';

const initState = {
    order: [],
    loading: false
}

export default function (state=initState,action){
    switch(action.payload){
        case GET_ORDERS :
            return{
                ...state,
                order: action.payload,
                loading: false
            }
        case CHECKOUT:
            return{
                ...state,
                order: [action.payload,...state.order]
            }
        case ORDERS_LOADING:
            return{
                ...state,
                loading:true
            }
        default:
            return state;
    }
}