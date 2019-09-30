const express=require('express')
const userRouter = express.Router()
const UserModel = require('../model/user.js')
const jwt = require('jsonwebtoken');



userRouter.post('/signin',(req,res) =>{    
    var userName =req.body.user.userName
    var password =req.body.user.password
    UserModel.findOne({$and:[{userName : userName},{ password : password}]},(err,user)=>{
        if(!user){
            res.status(401).send({msg:'no user'})
        }
            
        else{
            let payload ={ subject : user._id}
            let token = jwt.sign(payload, 'userlog')
            res.status(200).send({msg:'success',token,user})
        }
           
    })
})


userRouter.post('/signup' ,(req,res) =>{
    var user = {
        userName : req.body.user.userName,
        name : req.body.user.name,
        email : req.body.user.email,
        mobile : req.body.user.mobile,
        password : req.body.user.password,
    }

    UserModel.find({ $or :[ {userName : user.useruserName} , {email : user.email} , {mobile : user.mobile} ] },(err,userexist)=>{
        console.log(userexist)
        if(!userexist.length){
            console.log('signup')
            user = new UserModel(user);
            user.save(()=>{
            console.log(user)
            res.send({msg:'Successfully registered',user}) 
            })
         } 
        else{
            res.status(401).send({msg:'user exist'})
        }
    });

});



module.exports =userRouter;


