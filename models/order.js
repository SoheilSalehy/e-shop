const mongoose = require('mongoose');
const product = require('./product');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    products:[{
        product:{
            type:object,
            required:true
        },  
        quantity:{
            type:Number,
            required:true
        }
    }]
})
