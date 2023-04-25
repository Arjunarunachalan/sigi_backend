var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var User = require('../model/User')
var bcrypt = require('bcrypt')


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



module.exports = router;
