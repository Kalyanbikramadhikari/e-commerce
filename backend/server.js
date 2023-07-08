require('dotenv').config()
// require('dotenv').config({path:'backend/.env'})
//we can just use config here as we have defined .env file in root of project
const app = require('./app')
const cloudinary = require('cloudinary').v2
const connectDatabase = require('./config/database')
process.on('uncaughtException',err =>{
    console.log(`ERROR: ${err.message}`);
    console.log('shutting down the server due to uncaught exceptions')
    //thiskind of error occurs if we try to so sth that is not defined for e.g console.log(a) where a is not defined.
    
    process.exit(1)// exits from process
   
})

//connecting to database
connectDatabase();
// setting cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

// console.log('process.env.PORT', process.env.PORT)
app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.` )
})
// There didnot come use to handle Unhandled promise rejections as error directly showed what it was 
// expecting instead of showing handle unhandled promise rejections
// to handle unhandled promise rejections we set ap.listen to server
// Handle unhandled promise rejections
// this happens when we enter invalid connection string and we need to close our server in this case
process.on('unhandledRejection',err =>{
    console.log(`ERROR: ${err.stack}`);
    console.log('shutting down the server due to Uhandled Promise rejection')
    server.close(()=>{
        process.exit(1)// exits from process
    })
})


 