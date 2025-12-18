const Product = require('../models/product');
exports.getAddProduct = (req, res) => {
    res.render('admin/add_product',
    { path: '/admin/add_product', pageTitle: 'add product' })
};

//the page that admin go to edit products
exports.getAdminProduct = async (req, res) => {
    try {
        const products = await Product.find()
        res.render('admin/edit-products', {
            prods: products,
            pageTitle: 'admin products',
            path: 'admin/edit-products'
        });
    } catch (err) {
        console.log(err.message);
    }

}

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




