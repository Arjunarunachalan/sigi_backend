const jwt = require('jsonwebtoken')
const secretkey=process.env.JWT_TOKEN

//function to verify  jwt token
function verifyJwt(req,res,next){
    const token =req.headers.authorization; //assuming the jwt is sent in the authorization
    if(!token){
        return res.status(401).json({message:'No token Provide'})
    }

    jwt.verify(token,'secretkey',(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"Failed To Authenticate Token"})
        }


        //if Token is valid store the decoded user data in the request object
        req.user=decoded;
        next()
    })

}

module.exports= verifyJwt