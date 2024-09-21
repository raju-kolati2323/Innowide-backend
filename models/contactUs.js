var mongoose=require('mongoose')
var contactUsSchema=new mongoose.Schema({
    fullName:String,
    email:String,
    subject:String,
    message:String,
});
module.exports=mongoose.model('ContactUs',contactUsSchema);