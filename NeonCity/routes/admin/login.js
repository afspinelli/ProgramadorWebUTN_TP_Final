const { Router } = require('express');
var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'layout'
  });
});

/* GET logout page. */
router.get('/logout', function (req, res, next) {
  req.session.destroy();   // destroy
  res.render('admin/login', {
    layout: 'layout'
  });
});

router.post('/', async (req, res, next) => {
  try {
    var loginUser = req.body.inputUser;
    var loginPassword = req.body.inputPassword;

    var data = await usuariosModel.getUserByUsernameAndPassword(loginUser, loginPassword);

    if (data != undefined) {
      req.session.userId = data.id;
      req.session.userName = data.user;
      res.redirect('/admin/tutorials');

      console.log(data.id);
      console.log(data.user);

    } else {
      res.render('admin/login', {
        layout: 'layout',
        error: true
      });
    }
  } catch (error) {
    console.log(error);
  }
})


module.exports = router;