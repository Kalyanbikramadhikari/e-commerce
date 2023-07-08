// import { combineReducers, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from './features/APIslices/productApi';
import authSlice from './features/reducerSlices/authSlice';
import cartSlice from './features/reducerSlices/cartSlice';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import { productDetailReducer, productReducer } from './reducers/productReducers';
// import { authReducer } from './reducers/userReducer';
// import { cartReducer } from './reducers/cartReducers';
// import {productReducer} from './reducers/productReducers'
// const redux = require('redux')
// const createStore = redux.createStore;


// const reducer = combineReducers({
//     products: productReducer,
//     productDetail: productDetailReducer,
//     auth: authReducer,
//     cart: cartReducer,

// })



// let initialState ={};
// const middleware = [thunk]
const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        auth: authSlice,
        cart: cartSlice,
      },
      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
})

export default store;