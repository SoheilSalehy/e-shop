// === GET ===


exports.getLogin=(req,res)=>{

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

