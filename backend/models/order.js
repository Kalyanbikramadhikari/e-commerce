const mongoose = require('mongoose')

const orderSchmea = mongoose.Schema({
    shippingInfo:{
        address:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        phoneNo:{
            type: Number,
            required: true
        },
        postalCode:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    orderItems:[
        {
            name:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            image:{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,// previously it was just require check if error arrises
                ref: 'Product'
            }, 
        }
    ],
    paymentInfo:{
        id:{
            type:String,

        },
        status:{
            type: String
        }
    },
    paidAt:{
        type: Date
    },
    itemPrice:{ //  this will be for total item price. if we buy 3 apples of $2 then item price is $6

        type: Number,
        require: true,
        default: 0.0
    },
    taxPrice:{ 
        type: Number,
        require: true,
        default: 0.0
    },
    shippingPrice:{ 
        type: Number,
        require: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        require: true,
        default: 0.0
    },
    orderStatus:{
        type: String,
        require: true,
        default: 'Processing'
    },
    deliveredAt:{
        type: Date
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchmea)