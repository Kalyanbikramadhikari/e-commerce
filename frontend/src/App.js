import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

// import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

import Home from "./components/Home";
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart';
import { Shipping } from './components/cart/Shipping';
import Confirmingorder from './components/cart/Confirmingorder';
import Payment from './components/cart/Payment';
import Login from './components/user/Login';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from './features/reducerSlices/authSlice';
import Register from './components/user/register';
import PageNotFound from './components/layouts/PageNotFound';
// import { Toast } from 'react-toastify/dist/components';


//Admin imports
import Dashboard from './components/admin/Dashboard';
import { ProductsList } from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import ProtectedRoute from './components/route/ProtectedRoute';
import Profile from './components/user/Profile';
import Users from './components/admin/Users';
import axios from 'axios';
function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')

  
  const userData = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{'user':{}, 'token':''}
    // const userData = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{}

  console.log(userData);
  const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(getUserData(userData))

    async function getStripeApiKey (){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)

      getStripeApiKey();
    }
    
  },[])
  
  return (
    
    <Router>
      <div className="App">
        
        <Header/>
        <ToastContainer/>
        <Routes>
          
        <Route path="/" element = {<Home/>} />
        <Route path= "/product/:id" element = {<ProductDetails/>}/>
        <Route path= "/login" element = {<Login/>}/>
        <Route path= "/register" element = {<Register/>}/>
        <Route path= "/profile" element = {<Profile/>}/>

        <Route path= "/cart" element = {<ProtectedRoute><Cart/> </ProtectedRoute>}/>
        <Route path= "/shipping" element = {<ProtectedRoute><Shipping/> </ProtectedRoute>}/>
        <Route path= "/confirmorder" element = {<ProtectedRoute><Confirmingorder/> </ProtectedRoute>}/>
        <Route path= "/Payment" element = {<ProtectedRoute><Payment/> </ProtectedRoute>}/>
        <Route path= '/*' element = {<PageNotFound/>}/>
        {/* more to come here in admin route with protected route look later in the dashboard video */}
        <Route path = '/dashboard' element = {<ProtectedRoute><Dashboard/> </ProtectedRoute>} />
        <Route path = '/admin/products' element = { <ProtectedRoute> <ProductsList/></ProtectedRoute>} />
        <Route path = '/admin/newproduct' element = {<ProtectedRoute><NewProduct/></ProtectedRoute>} />
        <Route path = '/admin/users' element = {<ProtectedRoute><Users/></ProtectedRoute>} />




        </Routes>
        
        {/* exact means we have to exactly math the path */}
        
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
