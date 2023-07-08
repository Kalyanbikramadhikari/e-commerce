import React, { Fragment, useState, useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'

// import Loader from '../layout/Loader'
import MetaData from '../layouts/MetaData'

// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../features/APIslices/productApi'
// import { login, clearErrors } from '../../actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserData } from '../../features/reducerSlices/authSlice'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const alert = useAlert();
    const dispatch = useDispatch();
    const [login, {data: loginData, isLoading: isload, isSuccess:isSuccessed, status:statusss} ]= useLoginMutation()
    console.log('login',login, 'loginData',loginData , 'status',statusss)

    useEffect(()=>{
        if(isSuccessed){
            toast.success('Login successful')
            dispatch(getUserData(loginData))
            // dispatch(getUserData({'name':loginData.user.name, 'token':loginData.token }))

            navigate('/')

        }
        if(statusss === 'rejected'){
            toast.error('Incorrect email or password')
        }
    },[isSuccessed, statusss])
    

    // const { isAuthenticated, error, loading } = useSelector(state => state.auth);
    // console.log(isAuthenticated)
    // const redirect = location.search ? location.search.split('=')[1] : '/'

    // useEffect(() => {

    //     if (isAuthenticated) {
    //         navigate("/")
    //     }

    //     if (error) {
    //         // alert.error(error);
    //         dispatch(clearErrors());
    //     }

    // }, [dispatch, isAuthenticated, error])

    const submitHandler = (e) => {
        // toast.success('sent');
        e.preventDefault()// this means donot reload the page
        if(email&& password){
            login({'email':email, 'password':password})

        }else{
            toast.error('Provide both email and password')
        }
    }

    return (
        <Fragment>
            {/* {loading ? <Loader /> : ( */}
                <Fragment>
                    <MetaData title={'Login'} />

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>

                                <Link to="/register" className="float-right mt-3">New User?</Link>
                            </form>
                        </div>
                    </div>


                </Fragment>
                <ToastContainer/>
            {/* )} */}
        </Fragment>
    )
}

export default Login