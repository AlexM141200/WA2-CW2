const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantControllers.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')


router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get("/menu", controller.menu_page);
router.get("/", controller.landing_page);
router.get("/about", controller.about_page);
router.get("/about", controller.review_page);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get("/loggedInStaff",verify, controller.loggedInStaff);
router.get("/logout", controller.logout);
router.post("/delete", controller.delete);


//For updating and deleting items from database
router.get('/update/:id/:available/', (req, res) => {
    controller.updateMenu(req, res);
  })
router.get('/delete/:id', (req, res) => {
    controller.delete(req, res);
  })


router.post("/addFood", controller.addFood);

router.use(function(req, res) {
        res.status(404);
        res.type('text/plain');
        res.send('404 Not found.');
    });

    router.use(function(err, req, res, next) {
      res.status(500);
      res.type('text/plain');
      res.send('Internal Server Error.');
  });
module.exports = router;

module.exports = router;