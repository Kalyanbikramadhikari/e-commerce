// controller will contain all the route logics

const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const catchAsyncError= require('../middlewares/catchAsyncErrors')
const product = require('../models/product')
const Product = require('../models/product')
const APIFeatures = require('../utils/apiFeatures')
const ErrorHandler = require('../utils/errorHandler')
//create new product => /api/v1/products/new
module.exports.newProduct = catchAsyncError (async (req,res,next)=>{

    
    const product = await Product.create(req.body)
    res.status(201).json({// 201 is the status for created
        sucess: true,
        product
    })
})
//get al products from database => /api/v1/products?keyword=apple
module.exports.getProduts = catchAsyncError (async (req,res,next)=>{
     const resPerPage = 6;
    const productCount = await Product.countDocuments()// this will b used in frontend
    const apiFeatures = new APIFeatures(Product.find(),req.query )
                        .search()
                        .filter()
                        .pagination(resPerPage)
    const products = await apiFeatures.query
    setTimeout(()=>{
        res.status(200).json({
            success: true,
            // message:'this route will show all products in database.'
            products,
            resPerPage,
            productCount 
        })
    },1500);
})
// get all products (admin)=> /api/v1/admin/products
module.exports.getAdminProduts = catchAsyncError (async (req,res,next)=>{

    const products = await product.find();
    // setTimeout(()=>{
        res.status(200).json({
            success: true,
            products,
        })
    // },1500);
})

//get single product details

module.exports.getSingleProduct = catchAsyncError ( async (req,res,next)=>{
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
  // Yes, it's a valid ObjectId, proceed with `findById` call.
    const product = await Product.findById(req.params.id);
    // console.log('hello')
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
      
    }
    res.status(200).json({
        success: true,
        product
    })
    
}
else{
    return next(new ErrorHandler('wrong id',404))
}
    
})

//update products 
module.exports.updateProduct = catchAsyncError (async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success:false,
            message: 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.send(200).json({
        sucess: true,
        product
    })
})

//Delete Product

module.exports.deleteProducts = async (req,res,next)=>{
    // console.log('hi')
    try {
        const product = await Product.findById(req.params.id);
        console.log('product', product)
    if(!product){
        return res.status(404).json({
            success:false,
            message: 'Product not found'
        })
    }
    await product.remove()
    
    res.status(200).json({
        success: true,
        message: 'Product deleted'
    })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


// Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{
    const {rating, comment, productId}= req.body;

    const review ={
         user: req.user._id,// currently loggedin user
         name: req.user.name,
         rating:Number(rating),
         comment
    }

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find()
})