// === GET ===

const Product = require('../models/product');
exports.getAddProduct = (req, res) => {
    res.render('admin/add_product',
        { path: '/admin/add_product', pageTitle: 'add product',editing: false })
};

//the page that admin go to edit products
exports.getAdminProduct = async (req, res) => {
    
    try {
        const products = await Product.find()
        res.render('admin/products', {
            prods: products,
            pageTitle: 'admin products',
            path: '/admin/products'
        });
    } catch (err) {
        console.log(err.message);
    }

}

//edit page action
exports.getEditProduct = async (req, res) => {
    const editMode = req.query.edit;
    try {
        productId = req.params.productId;
        product = await Product.findById(productId);
        // to check if product found or not
        if (!product) return redirect('/');
        res.render('admin/add_product', {
            pageTitle: 'Edit product',
            path: '/admin/edit-product',
            editing: editMode,
            Product: product
        });
    } catch (err) {
        console.log(err.message);
    }
}

// === POST ===

//post product page action
exports.postAddProduct = async (req, res) => {
    //import values 
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    // creat product 
    const product = new Product({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    });
    await product.save();
    console.log("created new product...");
    res.redirect('/');

}

//post edit product action

exports.postEditProduct= async (req,res)=>{
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const prodId = req.body.productId;
    let product = await Product.findById(prodId);
    product.title= await updatedTitle;
    product.price= await updatedPrice;
    product.imageUrl= await updatedImageUrl;
    product.description= await updatedDescription;

    await product.save();
    console.log("product edited ...");
     res.redirect('/');
}



