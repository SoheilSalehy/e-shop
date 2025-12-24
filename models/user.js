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

userSchema.methods.addTocart=(product)=>{
    const cartProductIndex = this.cart.items.findIndex(cp=>{
        return cp.productId.toString() === product._id.toString()
    });

    const newQuaintity = 1;
    const updateCartItem = [...this.cart.items];
    if(cartProductIndex>=0){
        newQuaintity = this.cart.items[cartProductIndex].quantity+1;
        updateCartItem[cartProductIndex].quantity = newQuaintity;

    }else{
        updateCartItem.push({
            productId:product._id,
            quantity:newQuaintity
        })
    }
    const updatedCart = {
        items:updatedCartItem
    };

    this.cart= updatedCart;
    return this.save();
}



module.exports=mongoose.model('User',userSchema);

