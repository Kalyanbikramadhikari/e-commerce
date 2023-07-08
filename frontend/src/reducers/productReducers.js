
import {
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCESS,
    PRODUCT_DETAIL_FAIL
} from '../constants/productConstants'

// const initialProductState={
    
//     loading:false,
//     products:[],
//     error:''
// }

// const productReducer =(state=initialProductState, action)=>{
//     switch(action.type){
//         case ALL_PRODUCTS_REQUEST: return{
//             loading: true
//         }
//         case ALL_PRODUCTS_SUCCESS: return{
//             loading:false,
//             products: action.payload,
//             error:''
            
//         }
//         case ALL_PRODUCTS_FAIL: return{
            
//             loading:false,
//             error: action.payload
            
//         }
//         case CLEAR_ERRORS:
//                 return{
//                     ...state,
//                     error:null
//                 }
//         default: return state
//     }
// }

// export default productReducer;























export const productReducer =(state={products:[] }, action)=>{

    switch(action.type){
        case ALL_PRODUCTS_REQUEST:
            return{
                loading: true,
                products: []
            };
            case ALL_PRODUCTS_SUCCESS:
                return{
                    loading: false,
                    products: action.payload.data.products,
                    productCount: action.payload.productCount,
                    resPerPage: action.payload.resPerPage

                    
                };
            case ALL_PRODUCTS_FAIL:
                return{
                    loading: false,
                    error: action.payload
                };
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
       


        default:
            return state;
    }

}



export const productDetailReducer =(state={product:{}}, action)=>{

    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return{
                loading: true,
                product: {}
            };
            case PRODUCT_DETAIL_SUCESS:
                return{
                    loading: false,
                    products: action.payload,
                    
                };
            case PRODUCT_DETAIL_FAIL:
                return{
                    loading: false,
                    error: action.payload
                };
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
       


        default:
            return state;
    }

}