require('dotenv').config({path:'../backend/.env'})
// Create and send token in the cookie

const sendToken = (user, statusCode, res)=>{

    //Create jwt token
    const token = user.getJwtToken();

    //options for cookie
    const options = {
        expires: new Date(
        
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24*60*60*1000
           
        ),
        httpOnly : true // if httponly is not specified then it can be accessed using javascript code
    }
    res.status(statusCode).cookie('token',token,options).json(
        {
            success: true,
            user,
            token
    }
    )
    // cookie takes three paramaters one is key and second is the value of key and third is the options
}

module.exports = sendToken