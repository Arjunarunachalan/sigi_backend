const jwt = require('jsonwebtoken')

//function to verify  jwt token
async function verifyJwt(req,res,next){
    const token =req.headers.authorization; //assuming the jwt is sent in the authorization
    if(!token){
        return res.status(401).json({message:'No token Provide'})
    }
    //console.log(process.env.JWT_TOKEN);

    let decoded = await jwt.verify(token,process.env.JWT_TOKEN)
        if(!decoded){
            return res.status(401).json({message:"Failed To Authenticate Token"})
        }
        req.user={...decoded.user};
        next()

}

module.exports= verifyJwt