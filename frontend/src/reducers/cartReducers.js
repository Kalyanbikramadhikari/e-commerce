import { ADD_TO_CART } from "../constants/cartConstants";


export const cartReducer = (state={cartItems:[]}, action)=>{
    switch(action.type){
        case ADD_TO_CART: 
        const item = action.payload;

        const isItemExitInCart = state.cartItems.find(i=>i.product === item.product)

        if(isItemExitInCart){
            return{
                ...state,
                cartItems:[...state.cartItems]
            }
            // there is alittle change in logic here from the leacturer's code
            
        }else{
            return{
                ...state,
                cartItems:[...state.cartItems, item]
            }
        }
        default: return state
        
    }
}