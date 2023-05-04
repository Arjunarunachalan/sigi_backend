const jwt = require('jsonwebtoken');

const verifyToken = async (req,res,next)=>{
    const { authorization } = req.headers
    if( !authorization || authorization == "" ){
        return res.status(401).json({message : "User is not authenticated "})
    }
    let token = authorization.split(" ")[1] //  asjkghaldlakJBLKJSDLASLDHA;lshdabdlbaD;La
    let docodedValue = await jwt.verify(token, process.env.JWT_TOKEN);
    if(docodedValue || docodedValue == ""){
        return res.status(401).json({message : "User is not authenticated "})
    } else next();
}

module.exports = { verifyToken }