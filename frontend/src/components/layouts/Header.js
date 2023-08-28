import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../App.css'
import { logout } from '../../features/reducerSlices/authSlice'
const Header = () => {
    const data = useSelector((state)=> state.auth)
    const dispatch = useDispatch()

    console.log('data',data)
    const changeHandler=()=>{
        
    }
    const handleLogout = ()=>{
        console.log('hi');
        dispatch(logout())
        toast.success('Sucessfully logged out')
    }

  return (
    <div>
        <div className='header-box'>
            <div className='shopit-logo'>
               <Link to='/' ><img  src="/images/shopit_logo.png" alt=""/></Link>
            </div>
           
           
            <div className='input-header'>
                
                    <input className='product-input' type="" name="product_name" value ='' onChange={changeHandler} placeholder='Enter Product Name'/> 
                    <button className='search-product-button' type="button">
                        <i  className="fa-solid fa-magnifying-glass"></i>
                    </button> 
                
                
                
            </div>
            <div className='login-and-cart'>
                {data.user.name?(<div>
                    <div className='drop-plus-image'>
                <div className='user-image'>
                    <img className='profile-image' src="/images/default_avatar.jpg" alt=""/>
                    
                    <span className='user-name'>{data.user.name}</span><i className="fa-solid fa-caret-down"></i>
                </div>  

                {
                     data.user.role==='admin' ?(
                        <div className='drop-down'>
                    
                    <Link to = ''className='submenu'><button className='login-button' type="button" onClick={handleLogout} >Logout</button></Link>
                    <Link to = '/dashboard'className='submenu'>Dashboard</Link>
                </div>
                     ) :(
                        <div className='drop-down'>
                    
                    <Link to = ''className='submenu'><button className='login-button' type="button" onClick={handleLogout} >Logout</button></Link>
                    <Link to = '/profile'className='submenu'>Profile</Link>
                    <Link to = '#'className='submenu'>Orders</Link>
                </div>
                     )  
                    }
                
            </div>

                {/* <button className='login-button' type="button" onClick={handleLogout} >Logout</button> */}
                
                </div>): <div>
                <Link to ='/login'><button className='login-button' type="button">Login</button></Link>
                
                </div>}
                
                <Link to ='/cart'>
                    <div className='cart-box'>
                        <span className='cart'>Cart</span>
                        <button className='cart-button' type="button">2</button>

                    </div>
                </Link>
            </div>
         </div>
        
    </div>

  )
}

export default Header

//rafec == react arrow function component