import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";


export const addItemToCart= (id,quantity)=>async(dispatch, getState)=>{

    const {data} = await axios.get(`/api/v1/product/${id}`)
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.product._id,
            name: data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity
        }
    })
    // we also need to save data in the local storage so that if we reload the page datas will still be available
    // localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}