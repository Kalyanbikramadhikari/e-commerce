const express = require('express');
const { newProduct, getProduts, getSingleProduct, updateProduct, getAdminProduts,deleteProducts } = require('../controllers/productcontroller');
const router = express.Router();

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')
// const {getProducts}= require('../controllers/productcontroller') // variable name inside of curly braces is used when we
// // require a function.

router.route('/products').get(getProduts)
router.route('/admin/products').get(getAdminProduts)

router.route('/products/:id').get(getSingleProduct)// reteriving single product is giving problem when wrong id is given

router.route('/products/new').post(newProduct)

// router.route('/admin/products/:id').put(updateProduct);

// router.route('/admin/products/:id').delete(authorizeRoles('admin'),deleteProducts);
router.route('/admin/products/:id').delete(deleteProducts);

module.exports = router
