import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../features/APIslices/productApi'

const Users = () => {
    const navigate = useNavigate();
    const users = useGetAllUsersQuery()
    console.log('users',users)

    const [deleteUser, {data}]= useDeleteUserMutation()
    console.log('data', data)
    const success = data && data.success

    const handleDeleteUser=(id)=>{
        console.log('id', id)
        deleteUser(id)

    }
    const handlepen=()=>{

    }

    useEffect(()=>{
        if(success){
          toast.success('User removed sucessfully')
          navigate('/dashboard')
        }
      },[success])
  return (
    <div>
    <h1>Users</h1>
    <table>
      <tbody>
        
      
      <tr>
        <th>S.N.</th>
        <th>User _id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Created At</th>
        {/* <th>Stocks</th> */}
        <th>Actions</th>

      </tr>
      
        
      
        {users && users.data.users.map((item, id)=>(
          <tr key={item._id} >
            <td>{id +1}</td>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>{item.createdAt}</td>
            <td>
              <button type="button" onClick={()=>handleDeleteUser(item._id)}><i className="fa-solid fa-trash"></i></button>
              <button type="button" onClick={handlepen()}><i className="fa-solid fa-pen-to-square"></i></button>
            </td>
            </tr>
        
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Users