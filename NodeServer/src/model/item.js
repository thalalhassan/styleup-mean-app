const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://thalalhassan:thalalhassan@webapp-a2odf.mongodb.net/StyleUp?retryWrites=true&w=majority', { useNewUrlParser: true } )
// mongoose.connect('mongodb://localhost:27017/StyleUp');

const Schema = mongoose.Schema;

var item = new Schema({
    itemCode : String,
    itemBrand : String,
    itemGender : String,
    itemStyle : String,
    itemSleeve : String,
    itemColour : String,
    itemSize : {
            s:Number,
            m:Number,
            l:Number,
            xl:Number,
            },
    itemPrice : Number,
    itemImage : String
    
});
var ItemModel= mongoose.model('Item',item);
module.exports=ItemModel;