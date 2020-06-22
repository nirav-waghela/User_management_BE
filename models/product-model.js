const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        required:true
    },
    productIssueDate:{
        type:Date,
        required:true
    },

})

module.exports = mongoose.model('product', productSchema, 'products')