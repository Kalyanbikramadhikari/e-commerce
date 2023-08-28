import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../../features/APIslices/productApi';
const Register = () => {
    const dispatch = useDispatch();
    const [register,{data}] = useRegisterMutation()
    console.log(register, data)

    const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
  })
  const { name, email, password } = user;

    const defaultAvatar = 'images/default_avatar.jpg'
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
    // const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const onChange =(e)=>{
      e.preventDefault();
      const fieldName = e.target.getAttribute('name');
      const fieldValue = e.target.value;

      const newUser = {...user};
      newUser[fieldName] = fieldValue
      setUser(newUser)
    }


    const submitHandler = ()=>{
    //   const formData = new FormData();
    //   formData.set('name', name);
    //   formData.set('email', email)
    //   formData.set('password', password)
    //   formData.set('avatar', avatar)

      const userNow = {
        name: '',
        email: '',
        password: '',
      }
      setUser(userNow)
      dispatch(register({'name':name, 'email':email, 'password':password}))
      
    }
   

    return (
        <Fragment>

            {/* <MetaData title={'Register User'} /> */}
{/* 
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} >
                        <h1 className="mb-3">Register</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        
                                    />
                               
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                          
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div> */}
            
            <div className="register-page">
                <div className='register-content'>
                    <div className='label-input-container'>
                        <label htmlFor="" className='register-label'>Name</label>
                        <input type="text" className='register-input' onChange={onChange} placeholder='Enter your Name' name='name' value={name}/>
                    </div>
                    <div className='label-input-container'>
                        <label htmlFor="" className='register-label'>Email</label>
                        <input type="email" className='register-input' onChange={onChange} placeholder='Enter your Email' name='email' value={email} />
                    </div>
                    <div className='label-input-container'>
                        <label htmlFor="" className='register-label'>Password</label>
                        <input type="password" className='register-input' onChange={onChange} placeholder='Enter your Password' name='password' value={password} />
                    </div>
                    <div className='label-input-container'>
                        <label htmlFor="" className='register-label'>Avatar</label>
                        <div>
                            {/* this image will be the preview image and default one */}
                            <img src={defaultAvatar} className='default-avatar' alt="" />
                            <input type="file" />
                        

                        </div>
                    </div>
                    <div className='register-button-container'>
                        <button className='register-button' type="button" onClick={submitHandler}>REGISTER</button>

                    </div>
                    <div>
                        <span>Have an Account?</span>
                    </div>

                </div>
            </div>

        </Fragment>
    )
}

export default Register