import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    // REGISTER_USER_REQUEST,
    // REGISTER_USER_SUCCESS,
    // REGISTER_USER_FAIL,
    // LOAD_USER_REQUEST,
    // LOAD_USER_SUCCESS,
    // LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    // UPDATE_PROFILE_REQUEST,
    // UPDATE_PROFILE_SUCCESS,
    // UPDATE_PROFILE_FAIL,
    // UPDATE_PASSWORD_REQUEST,
    // UPDATE_PASSWORD_SUCCESS,
    // UPDATE_PASSWORD_FAIL,
    // FORGOT_PASSWORD_REQUEST,
    // FORGOT_PASSWORD_SUCCESS,
    // FORGOT_PASSWORD_FAIL,
    // NEW_PASSWORD_REQUEST,
    // NEW_PASSWORD_SUCCESS,
    // NEW_PASSWORD_FAIL,
    // ALL_USERS_REQUEST,
    // ALL_USERS_SUCCESS,
    // ALL_USERS_FAIL,
    // UPDATE_USER_REQUEST,
    // UPDATE_USER_SUCCESS,
    // UPDATE_USER_FAIL,
    // USER_DETAILS_REQUEST,
    // USER_DETAILS_SUCCESS,
    // USER_DETAILS_FAIL,
    // DELETE_USER_REQUEST,
    // DELETE_USER_SUCCESS,
    // DELETE_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

// export const register = (userData) => async (dispatch) => {
//     try {
//         dispatch({ type: REGISTER_USER_REQUEST })
//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         }
//         const { data } = await axios.post(`${import.meta.env.VITE_API}/register`, userData, config)

//         dispatch({
//             type: REGISTER_USER_SUCCESS,
//             payload: data.user
//         })
//     } catch (error) {
//         dispatch({
//             type: REGISTER_USER_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }

        const { data } = await axios.post(`${import.meta.env.VITE_API}/login`, { email, password }, config)
        console.log(data.user)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        console.log(error.response.data.message)

        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
        await axios.get(`${import.meta.env.VITE_API}/logout`, config)
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}