const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://thalalhassan:thalalhassan@webapp-a2odf.mongodb.net/StyleUp?retryWrites=true&w=majority', { useNewUrlParser: true } )
// mongoose.connect('mongodb://localhost:27017/StyleUp');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    
    itemId: String,
    itemName :String,
    itemImage :String,
    itemSize :String,
    itemPrice:Number,
    quantity: Number,
});
const cartSchema = new Schema({
    userId: String,
    cartItem: [ItemSchema],
});
var CartModel= mongoose.model('cart',cartSchema);
module.exports=CartModel;