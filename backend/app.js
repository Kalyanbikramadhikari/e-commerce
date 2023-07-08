const express = require('express')
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

// setting up cloudinary configuration

const products = require('./routes/products');
const payment = require('./routes/payment');
const auth = require('./routes/auth');

const order = require('./routes/order')
app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',payment)
app.use('/api/v1',order)


app.use(errorMiddleware);

module.exports= app
