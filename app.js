const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const PORT = 3000;

//=== port ===
app.listen(PORT, () => {
    console.log("Routering on port ", PORT);
});

//=== middleware ===
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findById('694fa0cb8a8511ed82f93275').then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err.message);
    })
})


//=== set ===
app.set('view engine', 'ejs'); // set ejs render for template engine
app.set('views', 'views'); // to set the address of views file

// listen to port 
mongoose.connect('mongodb://localhost/shop')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'soheil',
                    email: 'solyacount@gmail.com',
                    cart: {
                        item: []
                    }
                    
                });
                user.save();
                //694a9e3f9a6cf83d1421527d
            }
        })

        app.listen(PORT, () => {
            console.log('listening on port ', PORT);
        })
    })
    .catch(err => {
        console.log("Error : ", err.message);
    });

