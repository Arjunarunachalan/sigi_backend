var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var User = require('../../model/User')
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/signup', 
body("name").not().isEmpty().withMessage("Name is required"),
body("email")
  .not()
  .isEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Check your email address"),
body("password")
  .not()
  .isEmpty()
  .withMessage("Password is required")
  .isLength({ min: 6, max: 12 })
  .withMessage("Password must be at least 6 characters"),
async function (req, res, next) {
  const { errors } = validationResult(req);
    if (errors.length>0) {
      return res.status(400).json({ errors}) ;
    }

    const { email, password, phone } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(403).json({ message: `${email} is already exists` });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let userData = { ...req.body, password: hashedPassword };
    let newUser = new User({ ...userData });
    newUser
      .save()
      .then((response) => {
        const { name } = response;
        return res.status(200).json({ message: `User ${name} successfully regiestered` });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: `Internal server error ${error}` });
      });
});

router.post('/login',
body("email").not().isEmpty().withMessage("Email is required")
.isEmail().withMessage("Check your email address"),
body("password").not().isEmpty().withMessage("Password is required"),
async function (req, res, next) {
  const { errors } = validationResult(req);
    if (errors.length>0) {
      return res.status(400).json({ errors}) ;
    }
  
  const {email,password} = req.body;
  
    const user = await User.findOne({ email: email});
    
    if (user) {
      console.log(user,password);
      bcrypt.compare(password,user.password).then((response)=>{
       
        if(response){
          const token = jwt.sign(
            {user} ,
            process.env.JWT_TOKEN,
            {
              expiresIn: "2h",
            }
          );

          return res.status(200).json({ token,message: `${email} logged in succussfully` });
        }
      }).catch((err)=>{
        console.log(err
          )
        return res.status(403).json({message:"invalid password"})
      })
      
    }else{
      return res.status(400).json({message:"user doesn't exists"})
    }
  }
)




//  Change Password
router.post('/change-password',
body("oldPassword").not().isEmpty().withMessage("Old password is required").isLength({ min: 6, max: 12 }),
body("newPassword").not().isEmpty().withMessage("New password is required").isLength({ min: 6, max: 12 }),
body("confirmPassword").not().isEmpty().withMessage("Confirm password is required").isLength({ min: 6, max: 12 })
,async(req,res,next)=>{

    // express validator response
    const { errors } = validationResult(req);
    if (errors.length>0) {
      return res.status(400).json({ errors}) ;
    }
    // express validator response

    const { oldPassword } = req.body
    const { authorization } = req.headers
    let token = authorization.split(" ")[1]
    let docode = jwt.verify(token, process.env.JWT_TOKEN);
    console.log(docode);

})
//  Change Password


module.exports = router;