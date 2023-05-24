var express = require('express');
const Products = require('../../model/Products');
const { body, validationResult } = require('express-validator');
const { verifyToken } = require('../../utils/middleware');
  var router = express.Router();

router.post('/list', verifyToken,
body("name").not().isEmpty().withMessage("Name is required"),
body("price")
  .not()
  .isEmpty()
  .withMessage("Price is required"),
  body("description")
  .not()
  .isEmpty()
  .withMessage("description is required"),

async function (req, res, next) {

  const { errors } = validationResult(req);
    if (errors.length>0) {
      return res.status(400).json({ errors}) ;
    }

    console.log(req.headers.authorization)
    let productData={...req.body}
    let newProduct = new Products({ ...productData});
    newProduct
      .save()
      .then((response) => {
        const { name } = response;
        return res.status(200).json({ message: `Product ${name} successfully Added` });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: `Internal server error ${error}` });
      });
});

router.get('/list',async(req,res,next)=>{
 //display all product
   Products.find()
   .then((response)=>{
     return res.status(200).json({message:"successfully fetched",data:response})
   })
   .catch((err)=>{
     console.log(err)
   })
 })
router.get('/list/:id',async(req,res,next)=>{
  let proId=req.params.id
   Products.findById(proId)
   .then((response)=>{
     return res.status(200).json({message:"successfully fetched",data:response})
   })
   .catch((err)=>{
     console.log(err)
   })
 })

router.put('/list/:id',async(req,res,next)=>{
 

 let proId=req.params.id
  Products.findByIdAndUpdate(proId, req.body)
  .then((response)=>{
    console.log(response)
    return res.status(200).json({message:"product updated successfully"})
  }
  
  ).catch((err)=>{
    console.log(err)
  })
  
}
 )

module.exports = router;
