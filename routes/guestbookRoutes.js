const express = require('express');
const router = express.Router();
const controller = require('../controllers/guestbookControllers.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get("/menu", controller.menu_page);
router.get("/", controller.landing_page);
router.get("/about", controller.about_page);
router.get("/about", controller.review_page);
router.get('/new',verify,controller.show_new_entries);
router.post('/new', verify, controller.post_new_entry);
router.get('/posts/:author', controller.show_user_entries);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get("/loggedIn",verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);
router.get("/deleteFood", controller.new_delete_food);


router.post("/addFood", controller.addFood);



router.use(function(req, res) {
        res.status(404);
        res.type('text/plain');
        res.send('404 Not found.');
    });

module.exports = router;