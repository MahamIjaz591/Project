var mongoose = require('mongoose');
const Joi = require('@hapi/joi');

var productSchema = mongoose.Schema({
    name: String,
    price: Number,
    //description : String,
});

var Product = mongoose.model("Product", productSchema);

function validateProduct(data){
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().min(0).required(),
        //description: Joi.string().min(3).max(10).required(),
    });
    return schema.validate(data, { abortEarly: false});

}

  //var Product = mongoose.model("Product",productSchema);
  module.exports.Product = Product;
  module.exports.validate = validateProduct;
