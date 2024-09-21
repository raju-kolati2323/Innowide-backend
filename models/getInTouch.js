var mongoose=require('mongoose')
var getInTouchSchema= new mongoose.Schema({
    fullName:String,
    email:String,
    phoneNumber:Number,
    message:String,
});
module.exports=mongoose.model('GetInTouch',getInTouchSchema);