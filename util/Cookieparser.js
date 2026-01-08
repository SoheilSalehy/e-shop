
exports.cookieParse=(request)=>{
    const list = {};
    const cookieHeader = request.get('Cookie');
    if(!cookieHeader) return list ;
    cookieHeader.split(';').forEach(cookie => {

        console.log(cookie);
        
    });
}





