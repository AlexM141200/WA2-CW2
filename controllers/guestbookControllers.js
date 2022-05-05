const guestbookDAO = require("../models/guestbookModel");
const userDao = require("../models/userModel.js");

const db = new guestbookDAO();
db.init();

exports.show_login = function (req, res) {
  res.render("staff/login");
};

exports.handle_login = function (req, res) {
	db.getLunchMenus()
		.then((lunchMenus) => {
		db.getDinnerMenus()
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


exports.menu_page = function (req, res) {
	db.getLunchMenus()
		.then((lunchMenus) => {
		db.getDinnerMenus()
			.then((dinnerMenus) => {
				res.render("entries", {
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

exports.landing_page = function (req, res) {
  res.render("landingPage", {
    title: "Manson's Bistro",
  });
};

exports.review_page = function (req, res) {
  res.render("review", {
    title: "Manson's Bistro",
  });
};

exports.about_page = function (req, res) {
  res.render("about", {
    title: "About Us",
  });
};

exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Guest Book",
    user: "user",
  });
};

exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
  }
  db.addEntry(req.body.author, req.body.subject, req.body.contents);
  res.redirect("/loggedIn");
};

exports.show_user_entries = function (req, res) {
  let user = req.params.menu;
  db.getEntriesByUser(menu)
    .then((entries) => {
      res.render("entries", {
        title: "Guest Book",
        menu: menu,
        foods: foods,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.show_register_page = function (req, res) {
  res.render("staff/register");
};

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

exports.loggedIn_landing = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("entries", {
        title: "Guest Book",
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};

exports.delete_food= function (req, res) {
  db.remove({ name: req.body.name }, {}, function (err, docsRem) {
    if (err) {
      console.log("error deleting document");
    } else {
      console.log(docsRem, "document removed from database");
      res.redirect("/");
    }
  })
}

exports.new_delete_food =function(req,res){
  res.render('deleteFood', {
    'title':'Delete Food'
  })
}

