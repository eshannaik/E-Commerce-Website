const config = require ('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token'); // get token from request header called x-auth-token

    // Check for token
    if(!token){
        return res.status(401).json({msg:'No token,authorization denied'});
    }

    try{
        // verify token
        const decoded = jwt.verify(token,config.get('jwtsecret')) // decode the token
        // add user for payload
        req.user = decoded
        next(); // allows us to go on to the next middleware function
    }catch(e){
        res.status(400).json({msg:'Toekn is not valid'});
    }
}

module.exports = auth;