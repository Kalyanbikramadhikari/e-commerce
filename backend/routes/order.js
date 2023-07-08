const express = require('express');
const { 
    newOrder, 
    getSingleOrder ,
    myOrders,    
    allOrders,
    updateOrders,
    deleteOrder,
    getOrders
    } = require('../controllers/orderController');
const router = express.Router();

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')

router.route('/order/new').post(newOrder)
router.route('/order/:id').get(getSingleOrder)
router.route('/order/me').get(myOrders);
router.route('/admin/order').get(allOrders)
router.route('/admin/order/:id').put(updateOrders)
                                .delete(deleteOrder)
                                .get(getOrders)
module.exports= router