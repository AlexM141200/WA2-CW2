const menuDAO = require("../models/menuModel");
const userDao = require("../models/userModel.js");

const db = new menuDAO();
db.init();

exports.show_login = function (req, res) {
  res.render("staff/login");
};


//when user logs in, takes them to staff dashboard
exports.handle_login = function (req, res) {
	db.getAllLunchMenus()
		.then((lunchMenus) => {
		db.getAllDinnerMenus()
			.then((dinnerMenus) => {
				res.render("staff/staffDashboard", {
          title: "Staff Dashboard",
					LunchMenus: lunchMenus,
					DinnerMenus: dinnerMenus,
          user: "user",       
					})
					});
				})
			.catch((err) => {
			console.log("Promise Rejected", err);
			});
};

//render Menu Page with both lunch and dinner menus separately, so they can be displayed separately
exports.menu_page = function (req, res) {
	db.getLunchMenus()
		.then((lunchMenus) => {
		db.getDinnerMenus()
			.then((dinnerMenus) => {
				res.render("menus", {
          title: "Menus",
					LunchMenus: lunchMenus,
					DinnerMenus: dinnerMenus
					})
					});
				})
			.catch((err) => {
			console.log("Promise Rejected", err);
			});
};

//show home page
exports.landing_page = function (req, res) {
  res.render("landingPage", {
    title: "Manson's Bistro",
  });
};

//show reviews page
exports.review_page = function (req, res) {
  res.render("review", {
    title: "Reviews",
  });
};

//show about us page
exports.about_page = function (req, res) {
  res.render("about", {
    title: "About Us",
  });
};

//show registration form page
exports.show_register_page = function (req, res) {
  res.render("staff/register",{
    title: "Register",
  });
};

//new user register function
exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;

  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

//if staff is already logged in, redirects them to staff dashboard
exports.loggedInStaff = function (req, res) {
  db.getLunchMenus()
  .then((lunchMenus) => {
  db.getDinnerMenus()
    .then((dinnerMenus) => {
      res.render("staff/staffDashboard", {
        title: "Staff Dashboard",
               user: "user",
        LunchMenus: lunchMenus,
        DinnerMenus: dinnerMenus,
        })
        });
      })
    .catch((err) => {
    console.log("Promise Rejected", err);
    });
};
  

//logout
exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};

//delete a food from database, by ID
exports.delete = function (req, res) {
   db.delete(req.params.id);
   res.redirect("/loggedInStaff");
  }

//Add a new food to the database
exports.addFood = function(req,res){
  console.log("processing post-new_entry controller");
  if (!req.body) {
    response.status(400).send("Please Fix Entry");
    return;
  }
  db.addFood(req.body.dishname,
              req.body.description,
              req.body.chefSpecial,
              req.body.vegetarian,
              req.body.menu,
              req.body.price,
              req.body.available
  )
  res.redirect("/menu");
}

//Initial Code for Update Menu - Unfinished
exports.updateMenu=function(req,res){
  db.updateMenu(req.params.id,
                req.params.dishname,
                 req.params.description, 
                 req.params.chefSpecial, 
                 req.params.vegetarian,
                  req.params.menu, 
                  req.params.price, 
                  req.params.available,
                   req.params.ingredients, 
                   req.params.allergens,);
  res.redirect("/loggedInStaff");
}

exports.update=function(req, res){
  db.updateMenu(req.params.id, req.params.available);
  res.redirect("/loggedInStaff")
}

