var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',(req,res)=>{

})
router.post('./login',(req,res)=>{
  
})
module.exports = router;
