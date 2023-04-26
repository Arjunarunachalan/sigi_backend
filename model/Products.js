

const mongoose = require("mongoose")
const { Schema } = mongoose;

const productSchema = new Schema({
    name:{ type:String, required:true },
    price:Number,
    description:String,
    image:String,
    shopId: Schema.Types.ObjectId
    ,
});


module.exports = mongoose.model('Product', productSchema);