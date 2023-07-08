import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDeleteProductInAdminMutation, useGetAllAdminProductsQuery } from '../../features/APIslices/productApi'

export const ProductsList = () => {
    const navigate = useNavigate()
    const {data,isLoading,isFetching} = useGetAllAdminProductsQuery()
    console.log('data', data)
    const [deleteProductInAdmin, {data:adminProductList}] = useDeleteProductInAdminMutation()
    console.log('adminProductList', adminProductList)
    const success = adminProductList&& adminProductList.success
    // console.log('success', success)
    const handleDeleteProduct=(id)=>{
      console.log('id', id)
      deleteProductInAdmin(id)
    }
    const handlepen=()=>{

    }
    useEffect(()=>{
      if(success){
        toast.success('Item removed sucessfully')
        navigate('/dashboard')
      }
    },[success])

    
  return (
    <div>
      <h1>Products Lists</h1>
      <table>
        <tbody>
          
        
        <tr>
          <th>S.N.</th>
          <th>Id</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Ratings</th>
          <th>Stocks</th>
          <th>Actions</th>

        </tr>
        
          
        
          {data && data.products.map((item, id)=>(
            <tr key={item._id} >
              <td>{id +1}</td>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.ratings}</td>
              <td>{item.stock}</td>
              <td>
                <button type="button" onClick={()=>handleDeleteProduct(item._id)}><i className="fa-solid fa-trash"></i></button>
                <button type="button" onClick={handlepen()}><i className="fa-solid fa-pen-to-square"></i></button>
              </td>
              </tr>
          
          ))}
        </tbody>
      </table>
    </div>
  )
}
