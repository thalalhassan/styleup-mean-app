const express=require('express')
const cartRouter = express.Router()
const nodemailer = require('nodemailer');
const ItemModel = require('../model/item.js')
const CartModel = require('../model/cart.js')
const UserModel = require('../model/user.js')

var userEmail;

const transporter = nodemailer.createTransport({  
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'styleup424@gmail.com',
        pass:'thr@424424'
    }
});

cartRouter.post('/addtocart/:id',(req,res)=>{
    const item = req.body.item;
    const user_id = req.params.id;
    const size =req.body.size;

    CartModel.findOne({userId :user_id},(err,cart)=>{
        if(!cart){
            console.log("add ");
            var cart = new CartModel({
                userId : user_id
            })
            cart.cartItem.push({
                itemId: item._id,
                itemName :item.itemName,
                itemImage :item.itemImage,
                itemPrice :parseFloat(item.itemPrice),                
                itemSize: size,
                quantity: 1,
            })
            cart.save((err,cart)=>{
                if(!err){
                    res.send({msg:'New cart created' ,'cart':cart});
                    console.log('done');
                    
                }else{
                    console.log(err);
                }
            })
        }else{
            console.log("update");
            CartModel.findOne({$and :[ {userId: user_id},{cartItem: { $elemMatch: { $and: [{itemId : item._id}, {itemSize:size }] } } } ] },(err,cart)=>{
            if(cart){
                console.log(err);

            CartModel.findOneAndUpdate({$and :[ {userId: user_id},{cartItem: { $elemMatch: { $and: [{itemId : item._id}, {itemSize:size }] } } } ] },{$inc: {"cartItem.$.quantity" :1}},(err,cart)=>{
                        if(cart){
                console.log(err);

                            console.log('quan updated')
                            res.send({msg:'Item exist.Quantity Updated' ,'cart':cart});
                        }else{
                            console.log('err')
                        }
                    })
                }else{
            var cartItem={
                    itemId: item._id,
                    itemName :item.itemName,
                    itemImage :item.itemImage,
                    itemPrice :parseFloat(item.itemPrice),                
                    itemSize: size,
                    quantity: 1,
                }
            CartModel.findOneAndUpdate({userId:user_id},{"$push" :{"cartItem" :cartItem}},(err,cart)=>{
                if(cart){
                    res.send({msg:'New Item added','cart': cart});
                }else{
                    console.log('err')
                }
            })
        }
        })

        }
    })
});

cartRouter.get('/getcart/:id',(req,res)=>{
    const user_id = req.params.id;
    CartModel.findOne({userId :user_id},(err,cart)=>{
        if(cart){
            res.send({'msg':'cart exist',cart})
        }else{
            console.log('err')
        }
    })
})


cartRouter.post('/removecart/:id',(req,res)=>{  
    const item = req.body.item;
    const user_id = req.params.id;
    const mode= req.body.mode;
    if(mode == 'order'){
        count=item.quantity;
        console.log("mode"+mode);
        
    }else{
        count=1;
        console.log("mode"+mode);

    }
    if(count == item.quantity){
        CartModel.findOneAndUpdate({userId: user_id},{$pull: {cartItem:{_id:item._id} } },(err,cart)=>{
            if(cart){
                console.log('item removed' )
                res.send({'msg':'item removing',cart})
            }else{
                console.log('err')
            }
        })
    }else{
        CartModel.findOneAndUpdate({$and :[ {userId: user_id},{cartItem: { $elemMatch: { $and: [{ itemId : item.itemId },{itemSize : item.itemSize}] } } } ] },{$inc: {"cartItem.$.quantity" :-count}},(err,cart)=>{
            if(cart){
                    if(cart.cartItem['quantity'] == undefined){
                        res.send({'msg':'cart exist',cart})
                    }else{
                        res.send({'msg':'err'})
                    }
                }else{
                    console.log(err);
                    
                }
                })   
    }
})


cartRouter.post('/order',(req,res)=>{
    cartItem=req.body.item;
    const id=cartItem.itemId;
    const userId=req.body.userId;
    const selectedSize=cartItem.itemSize;
    const quantity=cartItem.quantity;

    UserModel.findOne({_id:userId},(err,user)=>{
        if(user){
          userEmail = user.email;
          console.log(userEmail)
        }  
    })

    ItemModel.findOne({_id:id},(err,item)=> {   
        itemLeft =item.itemSize[selectedSize]
        if(item.itemSize[selectedSize] < quantity){
            res.send({msg:'Item short ' ,itemLeft})
        }
        else{
                item.itemSize[selectedSize] -= quantity;
                itemUpdate = new ItemModel(item);
                itemUpdate.save((err,item)=>{
                    if(!err){
                        var mailToUser = {
                            from: 'styeleup424@gmail.com',
                            to: userEmail,
                            subject: 'Thank you for your purchase!',
                            html: ` 
                                    <h2>sTyleUp Fashion</h2>
                                    <div style="text-transform: uppercase; margin:auto"> 
                                    <p>Thank you for your purchase!</p>
                                    <img src="${item.itemImage}" alt=""  height="200" width="150">                                  
                                    <h4>Item  : ${item.itemBrand} ${item.itemGender}'s ${item.itemStyle}</h4> 
                                    <h4>Size: ${selectedSize} </h4>
                                    <h4>Total quantity:   ${quantity} </h4> 
                                    <h4>Total Price : Rs.${item.itemPrice * quantity} </h4>
                                    <p>  Please keep the price ready </p>
                                    </div>`
                          };
                          var mailToAdmin = {
                            from: 'styeleup424@gmail.com',
                            to: 'thalal424@gmail.com',
                            subject: 'Item purchased ',
                            html: ` 
                                    <h2>sTyleUp Fashion</h2>
                                    <div style="text-transform: uppercase; margin:auto"> 
                                    <p>Item purchased by <a href="">${userEmail}</a> !</p>
                                    <img src="${item.itemImage}" alt="" height="200" width="150">                                  
                                    <h4>Item  : ${item.itemBrand} ${item.itemGender}'s ${item.itemStyle}</h4> 
                                    <h4>Size: ${selectedSize} </h4>
                                    <h4>Total quantity: ${quantity}</h4>  
                                    <h4>Total Price : Rs.${item.itemPrice * quantity} </h4>
                                    </div>`
                          };

                        transporter.sendMail(mailToUser, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        transporter.sendMail(mailToAdmin, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        res.send({msg:'Thank you! we will update you with email', itemLeft, flag:true})
                        console.log('Item exist.Quantity Updated')
                    }else
                        console.log('err')
                })
        }
    });
})


module.exports =cartRouter;




