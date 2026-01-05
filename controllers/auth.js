
exports.getLogin=(req,res)=>{
    res.render('../views/auth/login.ejs',{
        path:'/login',
        pageTitle:'login'
    });
}
