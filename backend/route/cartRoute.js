const express=require("express");
const { authenticate } = require("../middleware/authantication");
const cartRouter=express.Router();
cartRouter.use(express.json());
cartRouter.use(authenticate);
cartRouter.get("/",(req,res)=>{
    res.send("cart page")
})
cartRouter.get("/all",async(req,res)=>{
    try {
        let data=await ProductModel.find({"userID":req.body.userID});
        res.send(data);
    } catch (error) {
        res.send(error);
    }
})
cartRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let data=await ProductModel.findOne({"_id":id})
        if(data.userID===req.body.userID)
    {
        await ProductModel.findByIdAndDelete({"_id":id})
        res.send({"msg":"done"});
    }else {
        req.send({"msg":"Not Authrized"});
    }
    } catch (error) {
        console.log(error);
        res.send("error");
    }
})
module.exports={
    cartRouter
}