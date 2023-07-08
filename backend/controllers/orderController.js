const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')
// const product = require('../models/product')


// create a new order  

module.exports.newOrder = catchAsyncError(async(req,res,next)=>{
   const {
    orderItems,
    shippingInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
   } = req.body;

   const order = await Order.create({
    orderItems,
    shippingInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    // user: req.user.id
   })

   res.status(200).json({
    success: true,
    order
   })
})

//get single order
exports.getSingleOrder = catchAsyncError (async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('No order found with this ID'),404)
    }
    res.status(200).json({
        success: true,
        order
    })
})

//get logged in user orders => /api/v1/order/me
exports.myOrders = catchAsyncError (async(req,res,next)=>{
    const order = await Order.find({user: req.user.id}) // req.user is not being accessed so there is error while rendering this route

    res.status(200).json({
        success: true,
        order
    })
})

//get all orders => /api/v1/admin/order
exports.allOrders = catchAsyncError (async(req,res,next)=>{
    const order = await Order.find() 

    let totalAmount = 0;
    order.forEach(o =>{
        totalAmount += o.totalPrice
    })

    res.status(200).json({
        success: true,
        order,
        totalAmount
    })
})

//Delete order =>/api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError (async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('No order found with this ID'),404)
    }
    await order.remove()
    res.status(200).json({
        success: true,
        
    })
})


//update/process order=> /api/v1/admin/order/:id  put request
exports.updateOrders = catchAsyncError (async(req,res,next)=>{
    const order = await Order.findById(req.params.id) 

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order',400))
    }

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        
    })
})

//view by admin i.e get request=> /api/v1/admin/order/:id
exports.getOrders = catchAsyncError (async(req,res,next)=>{
    const order = await Order.findById(req.params.id) 

    order.orderItems.forEach( async item=>{
        await updateStock(item.product, item.quantity)
    })

    
    
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        
        
    })
})

async function updateStock(id,quantity) {
    console.log(id)
    // const product = await Product.findById(id);
    // console.log(product)
    // product.stock = product.stock - quantity

    // await product.save()
}
