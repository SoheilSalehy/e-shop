// === GET ===

const session = require("express-session");


exports.getLogin=(req,res)=>{

    console.log(req.session.isLoggedIn);
    res.render('../views/auth/login.ejs',{
        path:'/login',
        pageTitle:'login'
    });
}





// === POST ===

exports.postLogIn= (req,res)=>{
    req.session.isLoggedIn = true;
    res.redirect('/');
}

