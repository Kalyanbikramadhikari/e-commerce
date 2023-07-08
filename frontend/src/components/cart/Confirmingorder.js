import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Checkoutsteps } from './Checkoutsteps'
const Confirmingorder = () => {

    const {name}= useSelector(state=>state.auth)
    const{shippingInfo, cartItems, cartAmount, cartTotalQuantity} = useSelector(state=>state.cart)
    console.log('cartItems', cartItems)
  return (
    <div className='confirm-order'>
        {/* hello */}
        <div className='steps-in-checkout'>
            <Checkoutsteps shipping confirmOrder />
        </div><br/><br/>
        
        <div className='order-divisor'>
        {shippingInfo && 
            <div className='dividend1'>
                <h5>Shipping Info:</h5><hr/>
                <div className='info-details'>
                    <span className='name'><b>Name: </b>{name}</span><br/>
                    <span className='name'><b>Phone: </b>{shippingInfo.phoneNumber}</span><br/>
                    <span className='name'><b>Address: </b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country}</span><br/>
                </div><hr/>
                <div className='cart-items'>
                    <h5>Your Cart Items:</h5>
                    <hr/>
                    {cartItems && cartItems.map(item=> (
                        <div className='item' key={item.product.product._id}>
                        <img className="conform-image" src="/images/photo1.jpg" alt=""/>
                        <span className='item-name'>{item.product.product.name}</span>
                        <span className='conform-price'><b>Rs.{item.product.product.price * item.quantity}</b></span>
                    </div>
                    ))}
                    
                </div>
            </div>
}
            <div className='dividend2'>
            <div className="cart-summary">
                    <h5 className="order-summary">Order Summary</h5>
                    <hr/>
                    <div className="total-container">
                        <span className="total-units">Total Units</span>
                        <span className="amount">Rs{cartAmount- 50}</span>
                    </div><hr/>
                    <div className="total-container">
                        <span className="shipping-charge">Shipping Charge</span>
                        <span className="charge">Rs.50</span>
                    </div><hr/>
                    <div className="total-container">                        
                        <span className="total-amount"><b>Total Amount</b></span>
                        <span className="total"><b>{cartAmount}</b></span>
                    </div><hr/>
                    <Link to = '/payment'><button className="checkout-button" type="button">Proceed for payment</button></Link>
                    {/* <a href="/payment"><button className="checkout-button" type="button">Proceed for payment</button></a> */}
                    
                    
                    
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Confirmingorder