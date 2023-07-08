import React from 'react'
import { Link } from 'react-router-dom'
// Link is generally used to naviagate within the program 
// using link will not reload the page as it did with anchor tag
export const Checkoutsteps = ({shipping, confirmOrder, payment}) => {
  return (
    <div className='checkout-steps'>
        {
          shipping? <Link to='/Shipping' className='ship'>
            <div className='triangle2-active'>   </div>
            <div className='step active-step'> Shipping </div>
            <div className='triangle-active'>   </div>
          </Link>:
          <Link to="#!"  disabled>
            <div className='triangle2-incomplete'>   </div>
            <div className='step incomplete'> Shipping  </div>
            <div className='triangle-incomplete'>   </div>
          </Link>
        }
        {
          confirmOrder? <Link to='/order/confirm' className='ship'>
            <div className='triangle2-active'>   </div>
            <div className='step active-step'> Confirm Order </div>
            <div className='triangle-active'>   </div>
          </Link>:
          <Link to="#!"  disabled>
            <div className='triangle-incomplete'>   </div>
            <div className='step incomplete'> Confirm Order </div>
            <div className='triangle2-incomplete'>   </div>
          </Link>
        }{
          payment? <Link to='/payment' className='ship'>
            <div className='triangle2-active'>   </div>
            <div className='step active-step'> Payment </div>
            <div className='triangle-active'>   </div>
          </Link>:
          <Link to="#!"  disabled>
            <div className='triangle-incomplete'>   </div>
            <div className='step incomplete'> Payment  </div>
            <div className='triangle2-incomplete'>   </div>
          </Link>
        }
    </div>
  )
}
