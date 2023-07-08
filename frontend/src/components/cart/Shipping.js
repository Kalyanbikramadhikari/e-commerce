import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { shippingDetails } from '../../features/reducerSlices/cartSlice'
import { Checkoutsteps } from './Checkoutsteps'
export const Shipping = () => {
  const {shippingInfo} = useSelector(state=>state.cart)
  console.log(shippingInfo)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [address, setAddress]= useState(shippingInfo.address || '')
  const [city, setCity] = useState(shippingInfo.city || '')
  const [phoneNumber, setphoneNumber] = useState(shippingInfo.phoneNumber || '')
  const [country, setCountry] = useState(shippingInfo.country || '')
 
  const handleContinue=(e)=>{
    e.preventDefault()
    dispatch(shippingDetails({'address':address, 'city':city, 'phoneNumber':phoneNumber, 'country':country}))
    navigate('/confirmorder')
  }
  return (
    <div >
      <div className='steps-in-checkout'>
      <Checkoutsteps shipping/>
      </div>  
    
      <div className='shipping-info'>
          <h3>Shipping Info</h3>         
          <div className='shipping-details'>
              <span className='address'>Address</span><br/>
              <input type="" name="address" value={address} onChange = {(e)=>setAddress(e.target.value)}/><br/>
              <span className='city'>City</span><br/>
              <input type="" name="city" value={city} onChange = {(e)=>setCity(e.target.value)}/><br/>
              <span className='phone-no'>Phone Number</span><br/>
              <input type="" name="phone-no" value={phoneNumber} onChange = {(e)=>setphoneNumber(e.target.value)}/><br/>
              <span className='Country'>Country</span><br/>
              <input name="country" value={country}  onChange = {(e)=>setCountry(e.target.value)}/>
               
               
              <br/><br/>
              {/* <Link to ='pageNotFound'>hello</Link> */}
              {/* Link to '/confirmorder' is not working but the usenavigate is working why is link not working below */}
              <Link className="continue-button" to = '/confirmorder'> <button type="button" onClick={handleContinue}>Continue</button></Link>
              {/* <a className="continue-button" href="/confirmorder"></a> */}

          </div>
      </div>
    </div>
  )
}
