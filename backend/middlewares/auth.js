
//Check if user is authenticated or not
const User = require('../models/product')
const jwt = require('jsonwebtoken')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    // since we have stored our token in cookie we can verify user from cookie
    // cookie can be accessed in the server side but cannot be accessed in frontend
    const {token} = req.cookies// {} is the destructing syntax 
    
    if(!token){
        return next(new ErrorHandler('Login first to access this resource',401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    
    console.log(decoded.id)
    req.user = await User.findById(decoded.id)
    

    next()
})


// Handling user roles
exports.authorizeRoles = (...roles)=>{
    return(req,res,next)=>{
        if (!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resources`,403))
        }
        next()
    }
}
