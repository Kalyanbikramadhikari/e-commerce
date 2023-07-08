import { clearErrors } from "../actions/productActions"
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constants/userConstants"



export const authReducer = (state= {user:{}}, action)=>{
    switch(action.type){
        case REGISTER_USER_REQUEST:
        case LOGIN_REQUEST : return{
            loading:true,
            isAuthenticated: false
        }
        case REGISTER_USER_SUCCESS:
        case LOGIN_SUCCESS: return{
            ...state,
            loading: false,
            user:action.payload,
            isAuthenticated: true

        }
        case REGISTER_USER_FAIL:
        case LOGIN_FAIL: return{
            ...state,
            loading:false,
            isAuthenticated: false,
            user:null,
            error: action.payload
        }
        case clearErrors:
            return{
                ...state,
                error:null
            }
        default: return{
            ...state
        }
    }
}