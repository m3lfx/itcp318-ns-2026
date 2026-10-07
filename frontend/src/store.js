import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import {
    productsReducer,
    productDetailsReducer,
    // newProductReducer,
    // newReviewReducer,


} from './reducers/productReducers'
import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    // allUsersReducer,
    userDetailsReducer,
} from './reducers/userReducers'

// import { cartReducer } from './reducers/cartReducers';

// import { newOrderReducer,
//     myOrdersReducer,
//     orderDetailsReducer,
//     allOrdersReducer,
//     orderReducer,
//  } from './reducers/orderReducers';

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    },
    user: {},
    auth: {},

}



const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    // newProduct: newProductReducer,
    // cart: cartReducer,
    // newOrder: newOrderReducer,
    // myOrders: myOrdersReducer,
    // orderDetails: orderDetailsReducer,
    // newReview: newReviewReducer,
    // allOrders: allOrdersReducer,
    // order: orderReducer,
    // allUsers: allUsersReducer,
    userDetails: userDetailsReducer,


})

const middlware = [thunk]
const store = createStore(reducer, initialState, applyMiddleware(...middlware))
export default store;