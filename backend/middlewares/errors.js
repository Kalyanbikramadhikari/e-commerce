// const ErrorHandler = require('../utils/errorHandler')
// I donot think this above has any relivance and the code should work without above code as well. If not find out why?
// yeah was not useful


// require('dotenv').config({path: '../.env'})
const path = require('path')
console.log('path', path.resolve(__dirname))
require('dotenv').config({path:path.resolve(__dirname, '../.env')})
// console.log('port from error.js',process.env.PORT)
// console.log('hello from error.js')



//I think we should not be confused here in exporting as we might be able to use module.export.somename and while importing this import with {somename} from ...
module.exports = (err, req, res, next)=>{
    console.log('err.statusCode', err.statusCode)
    
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error'
    // console.log(err.message)
    // console.log(err.statusCode)
    console.log(process.env.PORT)
    console.log(process.env.NODE_ENV)
    const devprod = process.env.NODE_ENV
    
    
    if(process.env.NODE_ENV =='DEVELOPMENT '){
       console.log('helool')
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    else if(process.env.NODE_ENV ==="PRODUCTION "){
        console.log('error')
        let error = {...err}

        error.message = err.message

        res.status(error.statusCode).json({
            success: false,
            
            errMessage: error.message || 'Internal server error',
            
        })
    }
    else{
        

        

        res.status(err.statusCode).json({
            success: false,
            errormessage: err.message,
            errStack: err.stack
        })
    }
}