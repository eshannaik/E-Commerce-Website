import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM,UPDATE_ITEM,ITEMS_LOADING} from './types';
import {returnErrors} from './errorActions';
import { response } from 'express';

// dispatch is only way to trigger an action in redux
// payload is a kind of info to identify that particular thing

// get all the items
export const getItems = () => dispatch => {
    dispatch(setItemsLoading()); // set items as loading then get the items
    axios.get('/api/items') // get all the items from the backend
        .then(res => dispatch ({
            type:GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data,err.response.status))) // calling returnErrors function in case of error
}

//to add items
export const addItem = (item) => (dispatch) => {
    axios.post('/api/items',item)
        .then(res => dispatch ({
            type:ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data,err.response.status)))
}

//delete items
export const deleteItem = (id) => (dispatch) => {
    axios.delete('/api/items/${id}') // find that item using the id and delete it
        .then(res => dispatch({
            type:DELETE_ITEM,
            payload: id //why set payload as id here
        }))
        .catch(err => dispatch(returnErrors(err.response.data,err.response.status)))
}

//update an item
export const updateItem = (id,item) => (dispatch) => {
    axios.put('/api/items/${id}',item) // 
        .then(res => dispatch ({
            type: UPDATE_ITEM,
            payload: Promise.all([id,res.data]) // both id and item
        }))
        .catch(err => dispatch(returnErrors(err.response.data,err.response.status)))
}

//sets type to items loading
export const setItemsLoading = () => {
    return{
        type:ITEMS_LOADING
    }
}