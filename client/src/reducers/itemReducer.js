import {GET_ITEMS, ADD_ITEM, DELETE_ITEM,UPDATE_ITEM,ITEMS_LOADING} from '../actions//types';

const initState = {
    items : [],
    loading: false
}

export default function(state = initState,action){
    switch(action.type){
        case GET_ITEMS :
            return{
                ...state, // calling state using spread operator (used for making an exact copy of an already existing array quickly)
                items: action.payload, // items array is the payload got from actions
                loading: false // since we got the items loading is set to false
            }
        case ADD_ITEM:
            return{
                ...state,
                items: [action.payload,...state.items] // add the new item got from the payload to the already existing set of items
            }
        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter (item => item._id != action.payload) // filter out the deleted item
            }
        case UPDATE_ITEM:
            const {id,data} = action.payload // getting id of the item to update and the data to which it has to be updated.
            return{
                ...state,
                items: state.item.map(item => { // use map function to run through the array of items
                    if(item.id == id){ // find the item we want to update
                        item = data
                    }
                })
            }
        case ITEMS_LOADING:
            return{
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}