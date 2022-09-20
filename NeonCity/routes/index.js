var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var tutorialsModel = require('../models/tutorialsModel')


/* GET home page. */
router.get('/', async function (req, res, next) {

  var tutorials = await tutorialsModel.getTutorials()

  res.render('index', {
    tutorials
  });
});


router.post("/", async (req, res, next) => {

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var phone = req.body.phone;
  var inputCity = req.body.inputCity;
  var email = req.body.email;
  var message = req.body.message;

  var obj = {
    to: 'afspinelli@gmail.com',
    subject: 'NEON CITY - WEB FORM',
    html: firstname + ' ' + lastname + ' from ' + inputCity + ' contacted through the web and wants more information to this email: ' + email + '. <br> In addition, he made the following comment: ' + message + '. <br> His phone number is: ' + phone
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'We received your message, we will contact you shortly'
  });
});


module.exports = router;
