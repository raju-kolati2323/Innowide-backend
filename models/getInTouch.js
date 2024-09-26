var mongoose=require('mongoose')
var getInTouchSchema= new mongoose.Schema({
    fullName:String,
    email:String,
    phoneNumber:String,
    message:String,
});
module.exports=mongoose.model('GetInTouch',getInTouchSchema);