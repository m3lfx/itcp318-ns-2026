import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    CLEAR_ERRORS
} from '../constants/productConstants';

export const getProducts = (currentPage = 1, keyword = '', price, category = '') => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        })

        let link = `${import.meta.env.VITE_API}/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}`

        if (category) {
            link = `${import.meta.env.VITE_API}/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }
        const { data } = await axios.get(link)
        console.log(data)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`${import.meta.env.VITE_API}/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// export const newProduct = (productData) => async (dispatch) => {
//     try {
//         dispatch({ type: NEW_PRODUCT_REQUEST })
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             withCredentials: true //correct
//         }
//         const { data } = await axios.post(`${import.meta.env.VITE_API}/admin/product/new`, productData, config)
//         dispatch({
//             type: NEW_PRODUCT_SUCCESS,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: NEW_PRODUCT_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

// export const getAdminProducts = () => async (dispatch) => {
//     try {
//         dispatch({ type: ADMIN_PRODUCTS_REQUEST })
//         const { data } = await axios.get(`${import.meta.env.VITE_API}/admin/products`, {
//             //AxiosRequestConfig parameter
//             withCredentials: true //correct
//         })
//         dispatch({
//             type: ADMIN_PRODUCTS_SUCCESS,
//             payload: data.products
//         })
//     } catch (error) {
//         dispatch({
//             type: ADMIN_PRODUCTS_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

// export const newReview = (reviewData) => async (dispatch) => {
//     try {
//         dispatch({ type: NEW_REVIEW_REQUEST })
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             withCredentials: true
//         }
//         const { data } = await axios.put(`${import.meta.env.VITE_API}/review`, reviewData, config)
//         dispatch({
//             type: NEW_REVIEW_SUCCESS,
//             payload: data.success
//         })
//     } catch (error) {
//         dispatch({
//             type: NEW_REVIEW_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}
