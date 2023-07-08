// import { Action } from '@remix-run/router'
import axios from 'axios'// to send request to backend
import {
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCESS
} from '../constants/productConstants'


// // defining action creators
// export const productRequest =()=>{
//     return{
//         type: ALL_PRODUCTS_REQUEST,
        
//     }
// }
// export const productSuccess =(products)=>{
//     return{
//         type: ALL_PRODUCTS_SUCCESS,
//         payload: products
//     }
// }
// export const productFail =(error)=>{
//     return{
//         type: ALL_PRODUCTS_FAIL,
//         payload: error
//     }
// }



// // now the async function. It returns the function bt not action object
// // to use this we need redux-thunk

// export const getProducts =() =>{
//     return (dispatch)=>{
//         dispatch(productRequest)

//         axios.get('/api/v1/products').then(response =>{
//             const products = response.data
//             dispatch(productSuccess(products))
//         }).catch(error=>{
//             const errormsg = error.message
//             dispatch(productFail(errormsg))
//         })
//     }
// }

//Clear Errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS  
    })
}








export const getProducts = ()=> async(dispatch)=>{
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        })
        const data= await axios.get('/api/v1/products') 
        
        
        dispatch({
            
            type:ALL_PRODUCTS_SUCCESS,
            payload:data
            
        })
    } catch (error) {
        dispatch({
            
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetail = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        })
        console.log(id)
        const{ data}= await axios.get(`/api/v1/products/${id}`) 
        // console.log(data)
         
        dispatch({
            
            type:PRODUCT_DETAIL_SUCESS,
            payload:data
            
        })
    } catch (error) {
        dispatch({
            
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

