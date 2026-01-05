const product = require('../models/product');
const Order = require('../models/order');

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

exports.getProducts = (req, res) => {
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

exports.getCart = async (req, res) => {
    const userProduct = await req.user.populate('cart.items.productId');
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: userProduct.cart.items
    });


}


exports.getOrder = (req, res) => {
    Order.find({ 'user.userId': req.user._id }).then(orders => {
        res.render('shop/orders', {
            pageTitle: 'Orders',
            path: '/orders',
            orders:orders
        });
    })

}



// === POST ===

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    product.findById(prodId)
        .then(product => {
            req.user.addTocart(product);
            res.redirect('/cart');
        });
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    req.user.removeFromeCart(prodId).then(result => {
        console.log(result);
        res.redirect('/cart');
    }).catch(err => {
        console.log(err.message);
    })


}

exports.postOrder = (req, res) => {
    req.user.populate('cart.items.productId')
        .then(user => {
            products = user.cart.items.map(item => {
                return {
                    product: { ...item.productId._doc },
                    quantity: item.quantity
                }
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            })
            console.log(order);
            return order.save();
        }).then(result => {
            return req.user.clearCart();
        }).then(() => {
            res.redirect('/orders');
        }).catch(err => {
            console.log(err.message);
        });
};

