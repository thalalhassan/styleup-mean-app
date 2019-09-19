const express = require('express');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const app= new express();
const bodyparser = require('body-parser');
const UserModel = require ('./src/model/user')


app.use(cors())
app.use(bodyparser.json())

function verifyToken(req,res,next){
    if(req.headers.authorization){
        return res.status(401).send('Unauthorized')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized')
    }
    let payload = jwt.verify(token,'userlog')
    if(!payload){
        return res.status(401).send('Unauthorized')
    }
    req.userId = payload.subject;
    next()
}

app.post('/signin',(req,res) =>{
    console.log('hello');
    
    var userName =req.body.user.userName
    var password =req.body.user.password
    UserModel.findOne({$and:[{userName:userName},{ password : password}]},(err,user)=>{
        if(!user){
            console.log('no user')
            res.status(401).send({msg:'no user'})
        }
            
        else{
            let payload ={ subject : user._id}
            let token = jwt.sign(payload, 'userlog')
            console.log('user')
            res.status(200).send({msg:'success',token,user})
        }
           
    })
})


app.post('/signup' ,(req,res) =>{
    console.log('signup')
    var user = {
        userName : req.body.user.userName,
        name : req.body.user.name,
        email : req.body.user.email,
        mobile : req.body.user.mobile,
        password : req.body.user.password,
    }
    UserModel.findOne({$or:[{userName:userName},{email:email},{mobile : mobile}]},(err,user)=>{
        if(!user){
            var user = new UserModel(user);
            user.save(()=>{
            console.log(user)
            res.send({msg:'Successfully registered',user}) 
            })
         } 
        else{
            res.status().send({msg:'user detail exist'})
        }
    });
});

app.post('/additem',verifyToken,(req,res,next)=>{


})

app.listen(3030,()=>{
    console.log("Listening to port 3030")
})