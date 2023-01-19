const mongo=require("mongoose")
const cartSchema=mongo.Schema({
    "name":String,
    "Details":String,
    "Price":Number,
    "userID":String
})
const cartModel=mongo.model("cart",cartSchema);
module.exports={
    cartModel
}