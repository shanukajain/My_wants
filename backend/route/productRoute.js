const express=require("express");
const { productauth } = require("../middleware/productauth");
const { ProductModel } = require("../models/productmodel");
const ProdcutRouter=express.Router();
ProdcutRouter.use(express.json());


ProdcutRouter.get("/",(req,res)=>{
    res.send("hello")
})
ProdcutRouter.get("/all",async(req,res)=>{
    try {
        let data=await ProductModel.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }
})
ProdcutRouter.use(productauth);
ProdcutRouter.post("/create",async(req,res)=>{
    try {
       let payload=req.body;
       let data=new ProductModel(payload);
       await data.save();
       res.send({"msg":"done"})
    } catch (error) {
        console.log(error);
        res.send("error");
    }
})

ProdcutRouter.patch("/update/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let data=await ProductModel.findOne({"_id":id})
        console.log(data)
        if(data.userId===req.body.userId)
    {
        const change=req.body;
        console.log(change);
        await ProductModel.findByIdAndUpdate({"_id":id},change);
        res.send({"msg":"done"});
    }else {
        req.send({"msg":"Not Authrized"});
    }
    } catch (error) {
        console.log(error);
        res.send("error");
    }
})
ProdcutRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let data=await ProductModel.findOne({"_id":id})
        if(data.userId===req.body.userId)
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
    ProdcutRouter
}