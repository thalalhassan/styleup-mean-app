const express=require('express')
const adminRouter = express.Router()
const ItemModel = require('../model/item.js')
const jwt = require('jsonwebtoken');


adminRouter.post('/signin',(req,res)=>{
    var adminName =req.body.admin.adminName
    var password =req.body.admin.password
    console.log('usr '+adminName+'  pwd '+password)
    if(adminName=='admin' && password == '12345678'){
        let payload ={ subject :adminName }
        let token = jwt.sign(payload, 'adminlog')
        res.status(200).send({msg:'success',token})
    }else{
        res.status(401).send({msg:'Admin details error'})

    }
})

adminRouter.post('/additem',(req,res,next)=>{  //verifyToken,

    var item ={
        itemCode : req.body.item.itemCode,
        itemBrand : req.body.item.itemBrand,
        itemGender : req.body.item.itemGender,
        itemStyle : req.body.item.itemStyle,
        itemSleeve : req.body.item.itemSleeve,
        itemColour : req.body.item.itemColour,
        itemSize : {
                s:req.body.item.itemSize.s,
                m:req.body.item.itemSize.m,
                l:req.body.item.itemSize.l,
                xl:req.body.item.itemSize.xl,
                },
        itemPrice : req.body.item.itemPrice,
        itemImage : req.body.item.itemImage
    };

    ItemModel.findOne({itemCode : item.itemCode},(err,itemexist)=>{
        if(!itemexist){
            item = new ItemModel(item);
            item.save(()=>{
                console.log('added item is',item)
                res.send({msg:'Successfully added Item'})
            })
        }else{ 
            res.status(200).send({msg:'item code exist'})
 
        }
    });
});

adminRouter.delete('/deleteitem/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id)
    ItemModel.findByIdAndDelete(id,(err,item)=>{
        if(item){
            res.send({msg:'deleted'})
        }else{
            res.send({msg:'no item'})
        }
    })    

})

adminRouter.put('/edititem/:id',(req,res)=>{
    const id=req.params.id;

    console.log(id)
    var item ={
        itemCode : req.body.item.itemCode,
        itemBrand : req.body.item.itemBrand,
        itemGender : req.body.item.itemGender,
        itemStyle : req.body.item.itemStyle,
        itemSleeve : req.body.item.itemSleeve,
        itemColour : req.body.item.itemColour,
        itemSize : {
            s:req.body.item.itemSize.s,
            m:req.body.item.itemSize.m,
            l:req.body.item.itemSize.l,
            xl:req.body.item.itemSize.xl,
                },
        itemPrice : req.body.item.itemPrice,
        itemImage : req.body.item.itemImage
    };
    ItemModel.findOneAndUpdate({_id:id},{$set:item},(err,item)=>{
        if(err){
            res.send({msg:"err"})
            console.log(err)

        }else{
            res.send({msg:"updated"})
            console.log(item)
        }
    })
})
module.exports = adminRouter;