import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, decreaseCart, increaseCart, removeFromCart, totalpriceIncart, totalproductIncart } from "../../features/reducerSlices/cartSlice";

const Cart = () => {
    const dispatch = useDispatch()
    const product = useSelector(state=>state.cart)
    // const user= useSelector(stat=>state.auth)
    const {cartItems, cartItemQuantity, cartAmount}= product
    const quantity = (cartItems&& cartItems.map(prod=>prod.quantity))
    const price = (cartItems && cartItems.map(item=> item.quantity * item.product.product.price ))
    console.log('quantity of products in cart',quantity)
    console.log('total price in cart',price)

    
    var totalNoOfProductInCart = 0;

    quantity.forEach(element => {
        totalNoOfProductInCart += element
    });
    console.log('totalNoOfProductInCart',totalNoOfProductInCart)

    var totalPrice = 0;
    price.forEach(element => {
        totalPrice += element
    });
    
    const [quanti, setquanti]= useState()
    // const{prod}= cartItems
    console.log('cartitems',cartItems)
    // console.log(product)
    const handleAdder =(product, quantity)=>{
        dispatch(increaseCart({'product':product, 'quantity':quantity}))
    }
    const handleSubtracter =(item)=>{
        dispatch(decreaseCart(item))
    }
    const handleRemoveItem=(item)=>{
        dispatch(removeFromCart(item))
    }
    useEffect(()=>{
        dispatch(totalproductIncart(totalNoOfProductInCart))
        dispatch(totalpriceIncart(totalPrice))
    })
    //  
    
    return (  
        <div className="cart-body" >
            {}
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="cart-dividor">
                <div className="items">
                    <h5>Items</h5><hr/>
                    {cartItems && cartItems.map((item)=>(
                    <div className="buy-items" key={item.product.product._id}>
                        <div className="cart-photo">
                            <img src="/images/photo1.jpg" alt=""/>
                        </div>
                        <div className="buy-items-details">
                            <span>{item.product.product.name}</span>
                            <p className='product-id'>Product {item.product.product._id}</p>
                            <div className='quantity-buttons-2'>
                                <button className='deduct-button' type="button" onClick={()=>handleSubtracter(item.product)}>-</button>
                                <span className='product-quantity'>{item.quantity}</span>
                                <button type="button" className='adder-button' onClick={()=>handleAdder( item.product, item.quantity)}>+</button><br/>
                                <div className="remove-and-total">
                                    <button type="button" className='item-remove' onClick={()=>handleRemoveItem(item)}> Remove</button>
                                    <span className="items-totall"><b>{item.product.product.price *item.quantity }</b></span>
                                </div>
                            </div>
                        </div> 
                        <hr/>    
                    </div>               
                     
                   
                    ))}                   
                    
                </div>
                <div className="cart-summary">
                    <h5 className="order-summary">Order Summary</h5>
                    <hr/>
                    <div className="total-container">
                        <span className="total-units">Total Units</span>
                        <span className="amount">{cartAmount- 50}</span>
                    </div><hr/>
                    <div className="total-container">
                        <span className="shipping-charge">Shipping Charge</span>
                        <span className="charge">Rs.50</span>
                    </div><hr/>
                    <div className="total-container">                        
                        <span className="total-amount"><b>Total Amount</b></span>
                        <span className="total"><b>Rs.{cartAmount}</b></span>
                    </div><hr/>
                    <Link to = '/Shipping'><button className="checkout-button" type="button">Check Out</button> </Link>
                    {/* <a href="/Shipping"><button className="checkout-button" type="button">Check Out</button></a> */}
                    
                    
                    
                </div>
            </div>
        </div>
    );
}

export default Cart;