import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADING} from './types';

//load user
export const loadUser = () => (dispatch,getState) => {
    dispatch(setUserLoading());

    axios.get('/api/user',tokenConfig(getState)) // token got from tokenconfig function 
        .then(res => dispatch ({
            type:USER_LOADED,
            payload: res.data
        }))
        .catch (err => {
            dispatch(returnErrors(err.response.data,err.response.status));
            dispatch({
                type:AUTH_ERROR
            });
        });
}

//registering users
export const register = ({name,email,password}) => dispatch => {
    //convert headers to json since its got from the frontend
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({name,email,password}) // converting to json format since its got from the frontend

    axios.post('/api/register',body,config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

// login users
export const login= ({email,password}) => dispatch => {
    //convert headers to json since its got from the frontend
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({email,password}) // converting to json format since its got from the frontend

    axios.post('/api/login',body,config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

//logout
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//setup config/headers and token
export const tokenConfig = getState => {
    //Get token from local storage
    const token = getState().auth.token;

    // Headers to JSON format
    const config = {
        headers:{
            "Content-type": "application/json",
        }
    }

    if(token){
        config.headers['x-auth-token']=token; // x-auth-token has the token value and we will store this value in a cariable called token
    }

    return config;
}

export const setUserLoading = () =>{
    return{
        type:USER_LOADING
    }
}