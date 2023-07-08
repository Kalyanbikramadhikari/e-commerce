import React, { useEffect ,useState} from 'react'
import MetaData from './layouts/MetaData'
import {useSelector, useDispatch} from 'react-redux'
// import { getProducts } from '../actions/productActions'
import {Link} from 'react-router-dom'
import { useGetAllProductsQuery } from '../features/APIslices/productApi'
// import Loader from './layouts/Loader'
// import Pagination from 'react-js-pagination'
const Home = () => {
    
    const {data,isLoading,isFetching} = useGetAllProductsQuery()
    
    // console.log(data)
    const prod = data && data.products;
    console.log(prod)
    const [currentPage, setCurrentPage] = useState(1)

    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
    }
    
  return (
    <>{
        isLoading?
        <div>Loading...</div> :
        <><div className='home-page'>
    
        <MetaData title={'Buy Best Products Online'}/>
       <span className='latest-products'>Latest Products</span>
    
       <div className='all-products'>
        
            {/* {products && products.map(product=>{ */}
                {prod && prod.map((prod)=>(
                    
                    <div key={prod._id} className='product'>
                        
                        <div className='image-holder'>
                            <img className='product-image-size' src="/images/photo1.jpg" alt=""/>
                        </div>
                        <div className='product-name'>
                            <span><b>{prod.name}</b></span>
                        </div>
                        <div className='product-ratings'>
                            <span>({prod.reviews})</span>
                        </div>
                        <div className='price'>
                            <span>${prod.price}</span>
                        </div>
                        <Link to={`/product/${prod._id}`} className='view-details'><button className='view-details' type="button">View Details</button></Link>
                    
                    </div>
                ))}
                
            <div>
                {/* <Pagination 
                    activePage={currentPage}
                    // itemsCountPerPage={resPerPage}// resPerPage is passed from the backend.
                    // totalItemsCount={[productsCount]}
                    // pageRangeDisplayed={5}
                    onChange={setCurrentPageNo}
                    nextPageText= {'Next'}
                    prevPageText= {'Prev'}
                    firstPageText= {'First'}
                    lastPageText= {'Last'}
                /> */}
            </div>
       </div>
    </div> </>
    }

   
    
</>
  )
}

export default Home