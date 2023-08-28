

// this slice will basically make available of the token and name of the user that logged in , in the redux state 
// and the local storage.

import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useGetAllAdminProductsQuery } from '../APIslices/productApi'


const initialState = {
  user:{},
  token:'',
  productsInAdmin: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserData: (state, action) => {
        console.log('action.payloaddddddddd',action.payload)
        state.user= action.payload.user
        state.token = action.payload.token

        localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state, action)=>{
      console.log('hi back');
        state.user= {}
        state.token= ''

        localStorage.clear();
    },
    // removeFromAdmin :(state, action)=>{
    //   const {data:admindata}= useGetAllAdminProductsQuery()
    //   console.log('admindata', admindata)
    //   state.productsInAdmin.push(admindata.products)

    //   // console.log('item removed');
    //   const prod = ( state.cartItems.filter((prod)=>
    //     prod.product.product._id!==itemToRemove.product.product._id      
    //   ))
    //   state.cartItems = prod
    //   toast.success(`${action.payload.product.product.name}successfully removed from dashboard`)
    // }
    
  },
})

// Action creators are generated for each case reducer function
export const { getUserData, logout} = authSlice.actions

export default authSlice.reducer