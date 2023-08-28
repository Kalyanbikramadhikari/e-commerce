import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addItemToCart } from '../../actions/cartActions'
import { getProductDetail } from '../../actions/productActions'
import {  useGetProductByIdQuery } from '../../features/APIslices/productApi'
import { addToCart } from '../../features/reducerSlices/cartSlice'
import MetaData from '../layouts/MetaData'
import {toast} from 'react-toastify'

const ProductDetails = () => {
    const {id}= useParams();
    // console.log(id)
    const {data}= useGetProductByIdQuery(id)
    // console.log('abc',data)
    const [quantity, setquantity] = useState(1)
    const {user}= useSelector(state=>state.auth)


    // const product = useSelector(state=>state.cart)
    // const {cartItems, cartItemQuantity}= product
    // const quanti = (cartItems&& cartItems.map(prod=>prod.quantity))
    // console.log('quantity of products in cart',quanti)
    
    // var totalNoOfProductInCart = 0;

    // quanti.forEach(element => {
    //     totalNoOfProductInCart += element
    // });
    // console.log('totalNoOfProductInCart',totalNoOfProductInCart)
    

    const dispatch = useDispatch()
    // const product = useSelector((state)=>state.productDetail.products)
    // console.log('abc',product)
    // useEffect(()=>{
    //     dispatch(getProductDetail(id))
    // },[dispatch,id])

    const incrementer =()=>{

        const stock =  (data && data.product.stock )
        
        const quant = quantity +1;
        if(stock>0 & quant<=stock ){
            setquantity(quant)
        }
        
        
        // if(product && )

    }
    const decrementer =()=>{

        const quant = quantity-1;
        if(quant>= 0){
            setquantity(quant)

        }
    }
    const addToCartHandler=(product, quantity)=>{
        
        
        console.log('abc', product,quantity)
        dispatch(addToCart({'product':product, 'quantity':quantity}))
    }
    const handleLoginFirst=()=>{
        // console.log('add to cart clicked')
        toast.info('Login First To Add Item To Cart')
    }

  return (
    <>
    
        { data &&
        
        <div className='product-details'>
            <MetaData titile={data.product.name}/>
        <div className='product-photo'>
            <img className='product-image' src="/images/img.png" alt=""/>
        </div>

        <div className='product-discription'>
            <h3 className='product-title'>{data.product.name}</h3>
            <p className='product-id'>{data.product._id}</p>
            
            <hr/>
            <div className='review-holder'>
                <i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i>
                <span>({data.product.numOfReviews} Reviews)</span>
            </div>
            <hr/>

            <div className='product-price'>
                <h2>$   {data.product.price}</h2>
                <div className='quantity-buttons'>
                    <button className='deduct-button' type="button" onClick={decrementer}>-</button>
                    <span className='product-quantity'>{quantity}</span>
                    <button type="button" className='adder-button' onClick={incrementer}>+</button>
                    {/* onClick={()=>handlecart(product)} */}
                {
                    user.name? 
                        (
                            <Link to='/cart'><button type="button" className='cart-adder' disabled={data.product.stock ===0} onClick={()=>addToCartHandler(data,quantity)} >  Add to Cart</button> 
                            </Link> 
                        ):
                        (
                            <div>
                                <button type="button" className='cart-adder' disabled={data.product.stock ===0} onClick={handleLoginFirst} >  Add to Cart</button> 
                            </div>
                        )
                }
                    
                </div>
            </div>
            <hr/>
            <div className='product-stock-status'>
                <p>Stock :<b>{data.product.stock}</b></p>
            </div>
            <hr/>

            <div className='description'>
                <p>{data.product.description}</p>
            </div>
            <hr/>

            <div className='product-seller'>
                <p>Sold by: <b>Amazon</b></p>
            </div>

            <br/>
            <div className='submit-review-button'>
                <button type="button" className='submit-review'> Submit your Review</button>
            </div>
        </div>
        
    </div>  }
        {/* <div className='product-details'>
            <div className='product-photo'>
                <img className='product-image' src="/images/tv.jpg" alt=""/>
            </div>

            <div className='product-discription'>
                <h3 className='product-title'>onn.32" className HD(720P) LED Roku Smart TV (100012589)</h3>
                <p className='product-id'>Product # sklflsd35sdf5090</p>
                
                <hr/>
                <div className='review-holder'>
                    <i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>
                    <span>(5 Reviews)</span>
                </div>
                <hr/>

                <div className='product-price'>
                    <h2>$108.00</h2>
                    <div className='quantity-buttons'>
                        <button className='deduct-button' type="button">-</button>
                        <span className='product-quantity'>1</span>
                        <button type="button" className='adder-button'>+</button>
                        <a href="/cart"><button type="button" className='cart-adder'> Add to Cart</button></a>
                    </div>
                </div>
                <hr/>
                <div className='product-stock-status'>
                    <p>Status: <b>In Stock</b></p>
                </div>
                <hr/>

                <div className='description'>
                    <p>Enjoy HD TV in Digital era. Once you see high definition of TV with vivid and crisp details, you’ll never look back to standard definition or analog TVs.The Personal Computer mode lets you work from the cloud on presentations, Excel and Word documents. You can also mirror your laptop for a big screen convenience or remotely access your office computer. Another excuse to work from home.</p>
                </div>
                <hr/>

                <div className='product-seller'>
                    <p>Sold by: <b>Amazon</b></p>
                </div>

                <br/>
                <div className='submit-review-button'>
                    <button type="button" className='submit-review'> Submit your Review</button>
                </div>
            </div>
            
        </div> */}
    </>    
  )
}

export default ProductDetails