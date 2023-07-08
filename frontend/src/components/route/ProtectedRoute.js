import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'



const ProtectedRoute = ({children}) => {
    const {user} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    if(user.name){
        if(user.role !=='admin'){
            return navigate('/')
        }
        return children
        
    }else{
        return navigate('/login')
    }

//   return (
//     <div>ProtectedRoute</div>
//   )
}

export default ProtectedRoute