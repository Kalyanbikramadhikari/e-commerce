// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {toast} from 'react-toastify'
// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'products',
    }),
    getAllAdminProducts: builder.query({
      query: () => 'admin/products',
    }),
    
    // deleteProductInAdmin:builder.mutation({
    //   query:(data) ()=>{

    //   }
    // })
    deleteProductInAdmin: builder.mutation({
      query:(id)=> {
        console.log('data',id)
        return{
          
          url: `/admin/products/${id}`, 
          method: 'DELETE',
          
          
        }
       
      },
    
    
    }),

    getAllUsers: builder.query({
      query: () => '/admin/users',
    }),
    
    deleteUser:builder.mutation({
      query:(id)=> {
        console.log('data',id)
             
        return{
          
          url: `/admin/users/${id}`, 
          method: 'DELETE',
          
        }
       
      },
    
    
    }),
    getProductById: builder.query({
        query:(id)=> {
            console.log('id',id)
            return{
                url: `products/${id}`
            }
        }
    }),
    

    
    login: builder.mutation({
      query:(data)=> {
        // console.log('data',data)
        // return{
        //     url: 'login', 
        //     method: 'POST',
        //     body: data
        // }
        
        return{
          url: '/login', 
          method: 'POST',
          body: data
        }
      },
    
    
    }),

    register: builder.mutation({
      query:(data)=> {
        console.log('registerData', data)
        return{
          url: '/register', 
          method: 'POST',
          body: data
        }
      },
    
    
    }),

    updatePassword: builder.mutation({
      query:(updatePasswordData)=> {
        console.log('updatePasswordData', updatePasswordData)
        return{
          url: '/password/update', 
          method: 'PUT',
          body: updatePasswordData
        }
      }, 
    }),

    newProduct: builder.mutation({
      query:(data)=> {
        console.log('newProductDAta', data)
        return{
          url: '/product/new', 
          method: 'POST',
          body: data
        }
      },
    
    
    }),



    // signin: builder.mutation({
    //   query:(data)=> {
    //     // console.log('data',data)
    //     // return{
    //     //     url: 'login', 
    //     //     method: 'POST',
    //     //     body: data
    //     // }
    //     try {
    //       return{
    //         url: 'signin', 
    //         method: 'POST',
    //         body: data
    //       }
          
    //     } catch (error) {
    //       toast.error('email and password doesnot match')
    //       console.log(error);
          
    //     }
    // },
    
    // }),
  })
})

export const { useGetAllProductsQuery,useGetAllUsersQuery,useDeleteUserMutation, useGetAllAdminProductsQuery, useDeleteProductInAdminMutation, useGetProductByIdQuery, useLoginMutation, useNewProductMutation,useRegisterMutation} = productApi