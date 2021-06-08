//Private Routes

const jwt = require('jsonwebtoken')

function(req,res,next) {
    const token = req.header('auth-token');
    if(!token) res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified;
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}