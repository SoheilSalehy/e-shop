const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const app = express();
const mongoose = require('mongoose');
//const user = require('./models/user')
const PORT = 3000;

//=== port ===
app.listen(PORT, () => {
    console.log("Routering on port ", PORT);
});

//=== middleware ===
app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRouter);
app.use(shopRouter);
app.use(express.static(path.join(__dirname, 'public')));

//=== set ===
app.set('view engine','ejs'); // set ejs render for template engine
app.set('views', 'views'); // to set the address of views file

// listen to port 
mongoose.connect('mongodb://localhost/shop')
.then(result=>{


    app.listen(PORT,()=>{
        console.log('listening on port ',PORT);
    })
})
.catch(err=>{
    console.log("Error : ",err.message);
});

