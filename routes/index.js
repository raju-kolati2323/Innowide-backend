var express = require('express');
var router = express.Router();
var contactUs = require('../models/contactUs');
var getInTouch = require('../models/getInTouch');
var nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer transporter setup
var transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail or any other email service
  host: 'smtp.gmail.com',
  port: 465,           // Use port 465 for SSL
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASSKEY
  }
});

// console.log(process.env.EMAIL_ID,process.env.PASSKEY)


// Function to send email
function sendMail(fromEmail, subject, text) {
  var mailOptions = {
    from: fromEmail, // Sender's email address from req.body
    to: process.env.EMAIL_ID, // Your email to receive form data
    subject: subject,        // Subject of the email
    text: text               // Text message content
  };

  return transporter.sendMail(mailOptions);
}

// Contact Us form submission
router.post('/contact-us', (req, res) => {
  var contact = new contactUs(req.body);

  contact.save()
    .then((pro) => {
      // Send email with form data
      const emailSubject = `New Contact Us Submission: ${req.body.subject}`;
      const emailText = `
        You have a new contact-form submission:
        \nFull Name: ${req.body.fullName}
        \nEmail: ${req.body.email}
        \nMessage: ${req.body.message}
      `;

      sendMail(req.body.email, emailSubject, emailText)
        .then(() => res.status(200).send('Contact form submitted and email sent successfully!'))
        .catch((err) => res.status(500).send('Contact form saved but error sending email:', err.message));
    })
    .catch((err) => res.status(404).send('Error submitting form:', err.message));
});

// Get In Touch form submission
router.post('/get-in-touch', (req, res) => {
  var touch = new getInTouch(req.body);

  touch.save()
    .then((pro) => {
      // Send email with form data
      const emailSubject = `New Get in Touch Submission`;
      const emailText = `
        You have a new Get in Touch submission:
        \nFull Name: ${req.body.fullName}
        \nEmail: ${req.body.email}
        \nPhone Number: ${req.body.phoneNumber}
        \nMessage: ${req.body.message}
      `;

      sendMail(req.body.email, emailSubject, emailText)
        .then(() => res.status(200).send('Form submitted and email sent successfully!'))
        .catch((err) => res.status(500).send('Form saved but error sending email:', err.message));
    })
    .catch((err) => res.status(404).send('Error submitting form:', err.message));
});

module.exports = router;
