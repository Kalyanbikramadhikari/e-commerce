import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  cartItems:localStorage.getItem('cartItems')
    ?JSON.parse(localStorage.getItem('cartItems'))
    :[],
  shippingInfo:localStorage.getItem('shippingInfo')
    ?JSON.parse(localStorage.getItem('shippingInfo'))
    :{},
  cartAmount:localStorage.getItem('totalPriceInCart')
  ?JSON.parse(localStorage.getItem('totalPriceInCart'))
  :0,
  cartTotalQuantity: localStorage.getItem('totalProductInCart')
  ?JSON.parse(localStorage.getItem('totalProductInCart'))
  :0,
  
}

export const addToCartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // state.cartTotalQuantity= action.payload
      // immutable state based off those changes
      // const isItemCart = (state.cartItems.product._id === action.payload.product._id? :)
      console.log('product',action.payload)
      const itemIndex = state.cartItems.findIndex(item=>item.product.product._id===action.payload.product.product._id)
      console.log(itemIndex)
      if(itemIndex>=0){
        state.cartItems[itemIndex].quantity += action.payload.quantity
        toast.success('Item successfully Increased to cart')
 
      }else{
        const tempProduct = action.payload
        state.cartItems.push(tempProduct)
        toast.success(`${action.payload.product.product.name}successfully added to cart`)
      }
     
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
      // console.log(action.payload)
    },
    removeFromCart:(state,action)=>{
      const itemToRemove = action.payload
      console.log('item to remove', itemToRemove)
      const prod = ( state.cartItems.filter((prod)=>
        prod.product.product._id!==itemToRemove.product.product._id      
      ))
      state.cartItems = prod
      toast.success(`${action.payload.product.product.name}successfully removed from cart`)
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))

    },
    totalproductIncart:(state,action)=>{
      // action.payload(action.payload)
      state.cartTotalQuantity = action.payload
      localStorage.setItem('totalProductInCart',JSON.stringify(state.cartTotalQuantity))


    },
    totalpriceIncart:(state,action)=>{
      state.cartAmount = action.payload + 50
      localStorage.setItem('totalPriceInCart',JSON.stringify(state.cartAmount))

    },
    decreaseCart: (state,action)=>{
      const itemIndex = state.cartItems.findIndex(item=>item.product.product._id ===action.payload.product._id)

      if(state.cartItems[itemIndex].quantity >1){
        state.cartItems[itemIndex].quantity -= 1
      }
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    }, 
    increaseCart:(state,action)=>{
      // console.log(action.payload)
      const itemIndex = state.cartItems.findIndex(item=>item.product.product._id ===action.payload.product.product._id)
      // console.log(itemIndex)
      if(state.cartItems[itemIndex].quantity>0 & state.cartItems[itemIndex].quantity< state.cartItems[itemIndex].product.product.stock ){
        state.cartItems[itemIndex].quantity += 1
      }
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
    shippingDetails:(state,action)=>{

      state.shippingInfo= (action.payload)

      localStorage.setItem('shippingInfo',JSON.stringify(state.shippingInfo))
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, totalproductIncart, decreaseCart, increaseCart, totalpriceIncart, shippingDetails} = addToCartSlice.actions

export default addToCartSlice.reducer


