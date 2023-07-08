const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    // _id:{  // the id field was added later when i received cast error.
    //     type: String
    // },
    name:{
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,//remove the blank spaces from start and end
        maxlength: [100, "Product length cannot exceed 100 characters"]
    },
    price:{
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0.0 ,
        maxlength: [7, "Product price cannot exceed 7 characters"]
    },
    description:{
        type: String,
        required: [true, 'Please enter product discription']
    },
    ratings:{//means the average rating of the product
        type: Number,
        default: 0
    },
    images:[//cloudinary will be used to store the images
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],//if correct category value will not be selected then message will be displayed.
            message: 'please select correct category for product'
        }
    },
    seller:{
        type:String,
        required: [true, 'Please enter product seller']
    },
    stock:{
        type: Number,
        required: [true, "please enter product stock"],
        maxlength: 5,
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    }, 
    reviews: [ 
        {
            name: {
                type: String,
                required: true,

            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ], 
    // createdAt:{
    //     type: Date,
    //     default: Date.now
    // }

    }

)

module.exports= mongoose.model('Product',productSchema);