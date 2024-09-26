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
function sendMail(fromEmail, subject, htmlContent) {
  var mailOptions = {
    from: `${fromEmail}`, // Sender's email address from req.body
    to: process.env.EMAIL_ID, // Your email to receive form data
    subject: subject,        // Subject of the email
    html: htmlContent,               // Text message content
    replyTo: fromEmail 
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
        <div style="border: 1px solid #ccc; border-radius: 5px; padding: 20px; max-width: 600px; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">New Contact Us Submission</h2>
          <p><strong>Full Name:</strong> ${req.body.fullName}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Message:</strong></p>
          <p>${req.body.message}</p>
        </div>
      `;

      sendMail(req.body.email, emailSubject, emailText)
        .then(() => res.status(200).send('Contact form submitted successfully!'))
        .catch((err) => res.status(500).send('Contact form saved but error sending email:', err.message));
    })
    .catch((err) => res.status(404).send('Error submitting form:', err.message));
});

// Get In Touch form submission
router.post('/get-in-touch', (req, res) => {
  const { fullName, email, phoneNumber, message } = req.body;

  // Validate phone number
  const phoneRegex = /^[6-9]\d{9}$/; // Validates that phone number is 10 digits and starts with 6-9

  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).send('Invalid phone number. It must be 10 digits long and start with 6, 7, 8, or 9.');
  }

  var touch = new getInTouch(req.body);

  touch.save()
    .then((pro) => {
      // Send email with form data
      const emailSubject = `New Get in Touch Submission`;
      const emailText = `
        <div style="border: 1px solid #ccc; border-radius: 5px; padding: 20px; max-width: 600px; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">New Get in Touch Submission</h2>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `;

      sendMail(email, emailSubject, emailText)
        .then(() => res.status(200).send('Form submitted successfully!'))
        .catch((err) => res.status(500).send('Form saved but error sending email:', err.message));
    })
    .catch((err) => res.status(404).send('Error submitting form:', err.message));
});


module.exports = router;
