const express = require('express');

const cors = require('cors');
const app= new express();
const bodyparser = require('body-parser');
const ItemModel = require ('./src/model/item')


app.use(cors())
app.use(bodyparser.json())


const userRouter = require('./src/routes/userRoutes.js');
const adminRouter = require('./src/routes/adminRoutes');
const cartRouter = require('./src/routes/cartRoutes');

app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/cart',cartRouter);

app.get('/getitems',(req,res)=>{
    ItemModel.find({},null,{sort:{ "_id":-1}},(err,item)=>{
        if(item){
            res.send(item);
        }else{
            res.send(err);
        }
    })
})

app.get('/getitems/:gender',(req,res)=>{
    const gender=req.params.gender
    ItemModel.find({itemGender:gender},(err,item)=>{
        if(item){
            res.send(item);
        }else{
            res.send(err);
        }
    })
})

 const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("Listening to port"+PORT)
    //if port alreadt in use : $ sudo kill -9 `sudo lsof -t -i:3030`
})