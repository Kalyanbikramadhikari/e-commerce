const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/users')

const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const cloudinary = require('cloudinary').v2
// const catchAsyncError = require('../middlewares/catchAsyncErrors')

// Register a user => /api/v1/Register
module.exports.registerUser = async(req,res,next)=>{
    // const result = await cloudinary.v2.uploder.upload(req.body.avatar,{
    //     folder:'avatars',
    //     width:150,
    //     crop: 'scale'
    // })
    // console.log('result', result)
    const {name , email, password} = req.body;    
    const user = await User.create({
        name, 
        email,
        password,
        // avatar:{
        //     public_id:result.public_id,
        //     url: result.secure_url
        // }
    })

    const token = user.getJwtToken()
    // sendToken(user,200,res)

    res.status(201).json({
        success:true,
        token
    })
}



exports.loginUser = catchAsyncErrors( async(req,res,next)=>{
    const {email,password} = req.body;

    // check if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }

    // find user and email in database

    const user = await User.findOne({email}).select('+password') //in model we have used select = false for password so we need to use .select method 
    if(!user){
        return next (new ErrorHandler('Invalid email or password',401))//401 is unauthenticated user
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('invalid email or password',400))
    }
    // sendToken(user,200,res) 

    const token = user.getJwtToken();

    res.status(200).json({
        success:true,
        token, 
        user
    })
})

// get currently logged in user details => /api/v1/me from 44

exports.getUserProfile = catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.user.id);
    console.log(user)
    res.send(200).json({
        success: true,
        user
    })
})


//update/change password =. /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password') // password is also selected here because to change password we need old password

    // Check previous user's password
    const isMatched = await user.comparePassword(req.body.oldPassword)//compare password is funciton in models/user.js
    if(!isMatched){
        return next(new ErrorHandler('old password is incorrect',400))
    }

    user.password = req.body.password
    await user.save();
    
    sendToken(user,200,res)

})
//update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData= {
        name: req.body.name,
        email: req.body.email 
    }

    //update avatar : todo

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,

    })

})

//Admin routes

// get all users => /api/v1/admin/users



module.exports.allUsers = catchAsyncErrors( async (req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors( async (req,res,next)=>{
    const user = await User.findById(req.params.id); //if you have the route /student/:id, then the “id” property is available as req.params.id.

    if(!user){
        return next(new ErrorHandler(`user with id ${req.params.id} not found`,404))
    }
    res.status(200).json({
        success:true,
        user
    })
})  


//Update admin => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async(req,res,next)=>{
    const newUserData= {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,

    })

})

//Delete user by admin => /api/v1/admin/user/:id

exports.deleteUser = catchAsyncErrors( async (req,res,next)=>{
    const user = await User.findById(req.params.id); //if you have the route /student/:id, then the “id” property is available as req.params.id.

    if(!user){
        return next(new ErrorHandler(`user with id ${req.params.id} not found`,404))
    }
    // Remove avatar form cloudinary- TODO
    await user.remove();
    res.status(200).json({
        success:true,
        
    })
})  
