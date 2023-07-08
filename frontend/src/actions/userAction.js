import axios from "axios";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS , CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL} from "../constants/userConstants";



export const login= (email, password)=>async(dispatch)=>{
    try{
        dispatch({
            type: LOGIN_REQUEST,

        })
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('api/v1/login',{email,password},config)
        console.log('hi')
        // console.log(data)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    }
    catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async(dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS  
    })
    
}

export const register =(userData)=>async(dispatch)=>{
   try{
    dispatch({
        type:REGISTER_USER_REQUEST
    })
    const config={
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }
    const {data} = axios.post('/api/v1/register',userData, config)
    dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user
    })
   } 
   catch(error){
    dispatch({
        type:REGISTER_USER_FAIL,
        payload:error
    })
   }
   
}
