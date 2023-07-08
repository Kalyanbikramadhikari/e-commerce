const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [ true, 'Please enter your name'],
        maxlength:[30, "Your name cannot exceed 30 characters"]
    }, 
    email : {
        type: String,
        required:[true, "Please enter your email"],
        unique: true,
        validate : [validator.isEmail, 'Please enter valid email address']
    },
    password:{
        type:String,
        required: [true, 'Please enter your password'],
        minlength : [6, 'Your password must be longer than 6 characters'],
        select: false // this means when we display user we donot want to display password of user
    },
    // avatar:{ // picture of the user
    //     public_id:{
    //         type: String,
    //         required: true
    //     }
       
    // },
    // url:{
    //     type: String,
    //     required: true 
    // },
    role:{
        type: String,
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

//Encryting password
userSchema.pre('save', async function(next){// we cannot use arrow function when we have to use this keyword
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password,4)
})
//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


// Return JSON WEB TOKEN
userSchema.methods.getJwtToken = function (){
    console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    // secretor private key must be atleast 32 characters long
    //payload here is the data of body . Data that is unique in database is passed.
    return jwt.sign({ id: this._id},process.env.JWT_SECRET,{ // create a signature that when the user visits the page, the server verifies the signature
        //and if the signature matches, the user is genuine
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}
module.exports = mongoose.model('User',userSchema)