const bcrypt = require('bcryptjs');
const User = require('../models/user');

// === GET ===


exports.getLogin=(req,res)=>{

    // const isLoggedIn = cookieParser.cookieParse(req);

    console.log(req.session.isLoggedIn);

    res.render('../views/auth/login.ejs',{
        path:'/login',
        pageTitle:'login',
        isAuthenticated : req.session.isLoggedIn,
        csrfToken : req.csrfToken()
    });
}

exports.getSignup=(req,res)=>{
    res.render('auth/signup',{
        pageTitle:'ثبت نام',
        path:'/signup',
        isAuthenticated:false,
        csrfToken : req.csrfToken()
    })
}



// === POST ===

exports.postLogIn= (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email:email
    }).then(
        user=>{
            if(!user){
                return res.redirect('/login');
            }
            
            bcrypt.compare(password,user.password).then(
                isMatch => {
                    if(isMatch){
                        req.session.isLoggedIn=true;
                        req.session.user=user;
                        req.session.save(err=>{
                            console.log(err);
                        });
                        res.redirect('/');
                    }
                }
                
            )

        }
    )
};


exports.postLogout=(req,res)=>{

    req.session.destroy((err=>{
        console.log(err);
        res.redirect('/');
    }));
}


exports.postSignup=(req,res)=>{
    const email= req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({
        email:email
    }).then(userDoc=>{
        if(userDoc){
            return res.redirect('/login');
        }
        return  bcrypt
        .hash(password,12)
        .then(hashedPassword=>{
            const user = new User ({
            email:email,
            password:hashedPassword,
            cart:{items:[]}
        })
            return user.save();
        })

    }).then( result =>{
        res.redirect('/login');

    }).catch(err=>{
        console.log(err);
    })


}




