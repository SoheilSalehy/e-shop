const product = require('../models/product');
const User = require('../models/user');

// === GET ===

//get product in main page
exports.getIndex = (req, res) => {
    product.find().then(product => {
        res.render('../views/shop/index.ejs', {
            path: '/',
            pageTitle: 'shop',
            prods: product
        });
    }).catch(err => {
        console.log(err.message);
    });
};

exports.getProducts = (erq, res) => {
    product.find().then(product => {
        res.render('../views/shop/index.ejs', {
            path: '/products',
            pageTitle: 'products',
            prods: product
        });
    }).catch(err => {
        console.log(err.message);
    });
}

exports.getProductDetail = async (req, res) => {
    try {
        const productId = req.params.productId;
        const Product = await product.findById(productId);
        res.render('shop/product-details', {
            product: Product,
            pageTitle: Product.title,
            path: '/products'
        });
    } catch (err) {
        console.log(err.message);
    }

}


// === POST ===

exports.postCart=(req,res)=>{
    const prodId = req.body.productId;
    product.findById(prodId)
    .then(product=>{
        return req.User.addTocart(product);
    });
}

