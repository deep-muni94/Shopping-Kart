/**

 @author    Deep Muni => B00828375

 **/

const productModel = require("../model/productModel");

const getAllProducts = (req, res) => {
    productModel.find().exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

const getSuggestions = (req, res) => {
    productModel.find({"productName" : {$regex : ".*"+ req.params.query +".*", $options: "i"}}).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

const getSearchedProducts = (req, res) => {
    productModel.find({"productName" : {$regex : ".*"+ req.params.query +".*", $options: "i"}}).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

/**
 @function author    Vikash Salvi => B00838074
 **/
const getProductDetails = (req,res) => {
    productModel.find({"productID" : req.params.query}).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}
/**
 @function author    Vikash Salvi => B00838074
 **/
const getTopProducts = (req,res) => {
    productModel.find().limit(4).exec()
        .then(data => {
            res.json({ Status :"Success", data : data});
        })
        .catch(err => {
            console.log("Failure:" + err);
        })
}

module.exports.getAllProducts = getAllProducts;
module.exports.getSuggestions = getSuggestions;
module.exports.getSearchedProducts = getSearchedProducts;
module.exports.getProductDetails = getProductDetails;
module.exports.getTopProducts = getTopProducts;
