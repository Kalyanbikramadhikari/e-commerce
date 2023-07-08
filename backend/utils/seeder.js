//This file will push the datas of the product.json file into the database.



const Product = require('../models/product');
const dotenv = require('dotenv').config
const connectDatabase = require('../config/database')


const products = require('../data/product.json'); // this is the products that we will want to push

connectDatabase();

const seedProducts = async()=>{
    try{
        await Product.deleteMany(); //will delete all the existing products
        console.log('Products are deleted.')

        await Product.insertMany(products)
        console.log('All products are added')

        process.exit();

    }catch(err){
        console.log(err)
        process.exit();
    }
}

seedProducts();