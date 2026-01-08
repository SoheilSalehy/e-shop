// === GET ===

const session = require("express-session");
const cookieParser = require('../util/Cookieparser');


exports.getLogin=(req,res)=>{

    const isLoggedIn = cookieParser.cookieParse(req);
    console.log(isLoggedIn);

    console.log(req.session.isLoggedIn);
    res.render('../views/auth/login.ejs',{
        path:'/login',
        pageTitle:'login'
    });
}





// === POST ===

exports.postLogIn= (req,res)=>{

    res.setHeader('set-Cookie','loggedIn=true');
    res.redirect('/');
}



