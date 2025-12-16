const Product = require('../models/product');
exports.getAddProduct = (req,res)=>{
    res.render('admin/add_product',{path:'/admin/add_product',pageTitle:'add product'})
};

exports.postAddProduct= async(req,res)=>{
    //import values 
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description= req.body.description;
    // creat product 
    const product = new Product({
        title: title,
        price : price ,
        imageUrl: imageUrl,
        description:description
    });
    await product.save();
    console.log("created new product...");
    res.redirect('/');
    
}