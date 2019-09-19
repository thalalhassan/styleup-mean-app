const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://thalalhassan:thalalhassan@webapp-a2odf.mongodb.net/StyleUp?retryWrites=true&w=majority')
const Schema = mongoose.Schema;

var user = new Schema({
    userName:String,
    name:String,
    email:String,
    mobile:String,
    password:String
})
var UserModel= mongoose.model('user',user);
module.exports=UserModel;