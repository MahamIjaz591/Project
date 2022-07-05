
const express = require('express');
//const res = require('express/lib/response');
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
var { Product} = require("../../models/product");


// get products
//router.get("/",auth,admin,async(req,res) => {
router.get("/",async(req,res) => {
    console.log(req.user);
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = (perPage*(page-1));
    let products = await Product.find().skip(skipRecords).limit(perPage);
    //let total = await Product.countDocuments();
    return res.send(products);

});

// get  single product
router.get("/:id",async(req,res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) return res.status(400).send("Product with given id is not present");
        return res.send(product);
    } catch (err) {
        return res.status(400).send("Invalid Id");
    }

});
//update a record
router.put("/:id",validateProduct,auth,admin,async(req,res) =>{
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    //product.description = req.body.description;
    await product.save();
    return res.send(product);

});


//delete a record
router.delete("/:id",auth,admin,async(req,res) =>{
    let product = await Product.findByIdAndDelete(req.params.id);
    
    return res.send(product);

});

//insert a record
router.post("/",auth,validateProduct,async(req,res) => {
    
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    //product.description = req.body.description;
    await product.save();
    return res.send(product);

});


module.exports = router;
