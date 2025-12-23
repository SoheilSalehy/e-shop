const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:15
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:8,
        maxlength:20,
        lowercase:true
    },
    cart:{
        items:[{
            productId:{
                required:true,
                type:Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:Number,
                required:true
            }
        }]
    }
}); 


module.exports=mongoose.model('User',userSchema);

