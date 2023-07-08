import React from 'react'
import { useSelector } from 'react-redux'

const UpdatePassword = () => {

    const {user} = useSelector(state=>state.auth)
  return (
    <div>UpdatePassword</div>
  )
}

export default UpdatePassword