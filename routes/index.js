var express = require('express');
var router = express.Router();
var contactUs=require('../models/contactUs')
var getInTouch=require('../models/getInTouch')

router.post('/contact-us',(req,res)=>{
  var contact=new contactUs(req.body);
  contact.save()
  .then((pro)=>res.status(200).send('Contact form submitted successfully'))
  .catch((err)=>res.status(404).send('Error submitting form:', err.message))
})

router.post('/get-in-touch',(req,res)=>{
  var touch=new getInTouch(req.body);
  touch.save()
  .then((pro)=>res.status(200).send('Form submitted successfully'))
  .catch((err)=>res.status(404).send('Error submitting form:', err.message))
})  

module.exports = router;
