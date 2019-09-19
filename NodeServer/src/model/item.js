const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://thalalhassan:thalalhassan@webapp-a2odf.mongodb.net/StyleUp?retryWrites=true&w=majority')
const Schema = mongoose.Schema;

var item = new Schema({
    itemName=String,
    itemCode=String,
    
})
var ItemModel= mongoose.model('Item',item);
exports=ItemModel;