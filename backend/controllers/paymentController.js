// here path might be wrong

require('dotenv').config({path:'backend/.env'})
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

console.log('process.env.STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY)



// process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async(req,res,next)=>{
    const paymentIntent = await stripe.payment.paymentIntent.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata : {intergation_check: 'accept a payment'}
    }); 
    res.status(200).json({
        success: true,
        client_Secret: paymentIntent.client_Secret        
    })
})

// send stripe api key => /api/v1/stripeapi
exports.sendStripeApi = catchAsyncErrors(async(req,res,next)=>{
    const paymentIntent = await stripe.payment.paymentIntent.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata : {intergation_check: 'accept a payment'}
    }); 
    res.status(200).json({
       stripeApiKey : process.env.STRIPE_API       
    })
})