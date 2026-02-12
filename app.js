const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const authRouter = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const PORT = 3000;
const MongoDB_URI = 'mongodb://localhost/shop';
const MongoDBstore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const store = new MongoDBstore({
    uri: MongoDB_URI,
    collection: 'session'
});

//=== port ===
app.listen(PORT, () => {
    console.log("Routering on port ", PORT);
});

//=== middleware ===

const csrfProtection = csrf();
app.use((req, res, next) => {
    
    User.findById('695e213afbfe764b998a8531').then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err.message);
    })
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my session', resave: false, saveUninitialized: false, store: store }));// session settin
app.use(csrfProtection);
app.use(authRouter);
app.use('/admin', adminRouter);
app.use(shopRouter);




//=== set ===
app.set('view engine', 'ejs'); // set ejs render for template engine
app.set('views', 'views'); // to set the address of views file

// listen to port 
mongoose.connect(MongoDB_URI)
    .then(result => {
       
        
        app.listen(PORT, () => {
            console.log('listening on port ', PORT);
        })
    })
    .catch(err => {
        console.log("Error : ", err.message);
    });

