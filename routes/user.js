var express = require('express');
const userHelpers = require('../helpers/userHelpers');
const { response } = require('../app');
var router = express.Router();



router.get('/', function(req, res, next) {
  
});
router.get('/signup',(req,res)=>{
res.redirect('/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response)
  })
})
router.get('/login',(req,res)=>{

})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    console.log(response)
  })

})

module.exports = router;
