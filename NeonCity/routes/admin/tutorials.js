var express = require('express');
var router = express.Router();
var tutorialsModel = require('../../models/tutorialsModel');


/* GET Tutorials page. */
router.get('/', async function (req, res, next) {

  var tutorials = await tutorialsModel.getTutorials();

  res.render('admin/tutorials', {
    layout: 'layout',
    userName: req.session.userName, // ej: flavia, adrian, etc
    tutorials
  });
});

router.get('/delete/:id', async (req, res, next) => {
  var id = req.params.id;
  await tutorialsModel.deleteTutorialsById(id);
  res.redirect('/admin/tutorials')
});


/* Formulario para agregar tutoriales */
router.get('/add', function (req, res, next) {
  res.render('admin/add', { // agregar hbs
    layout: 'layout',
  }); // cierra render
}); // cierra Get


/* Guardar cuando presiono el boton */
router.post('/add', async (req, res, next) => {
  console.log(req.body)
  try {
    if (req.body.title != "" && req.body.link != "") {
      await tutorialsModel.addTutorial(req.body);
      res.redirect('/admin/tutorials')
    } else {
      res.render('admin/add', {
        layout: 'layout',
        error: true,
        message: 'All fields are require'
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/add', {
      layout: 'layout',
      error: true,
      message: 'No data charge'
    });
  }
})

/* Editar Tutorials */
router.get('/edit/:id', async (req, res, next) => {
  var id = req.params.id;
  var tutorial = await tutorialsModel.getTutorialsById(id);

  res.render('admin/edit', {
    layout: 'layout',
    tutorial
  });
});


/* Modificar cuando presiono el boton */
router.post('/edit', async (req, res, next) => {
  /* console.log(req.body.id);
  console.log(req.body.title);
  console.log(req.body.link); */
  try {
    /* if (req.body.title != "" && req.body.link != "") { */
      var obj = {
        title: req.body.title,
        link: req.body.link
      }

      console.log(obj);
      console.log(req.body.id);

      await tutorialsModel.editTutorialsById(obj, req.body.id);
      res.redirect('/admin/tutorials')
/*     } else {
      res.render('admin/edit', {
        layout: 'admin/layout',
        error: true,
        message: 'All fields are require'
      });
    } */
  } catch (error) {
    console.log(error);
    res.render('admin/edit', {
      layout: 'admin/layout',
      error: true,
      message: 'Fields were not modified '
    })
  }
});





module.exports = router;