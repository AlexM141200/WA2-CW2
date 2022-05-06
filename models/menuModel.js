const res = require('express/lib/response');
const nedb = require('nedb');
class Menu {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    
    //a function to seed the database
    init() {
        this.db.insert({
            dishname: 'French Onion Soup',
            description: 'A delicate onion soup slowly hand caremelized in-house, topped with melted cheese and beef stock.',
            chefSpecial: false,
            vegetarian: true,
            menu: 'dinner',
            price: '11.50',
            available: true,
            ingredients: ['Crab', 'Rice', 'Butter', 'Garlic', 'Cheese', 'Onion', 'Wine'],
            allergens: ['Butter', 'Cheese'],
        });
        console.log("inserted soup");

        this.db.insert({
            dishname: 'Crab & Saffron Risotto',
            description: 'A seasoned crab risotto garnished with finely chopped dill.',
            chefSpecial: true,
            vegetarian: false,
            menu: 'lunch',
            price: '8.35',
            available: true,
            ingredients: ['Crab', 'Rice', 'Butter', 'Garlic', 'Cheese', 'Onion', 'Wine'],
            allergens: ['Butter', 'Cheese', 'Wine'],

        });
        console.log("inserted risotto");

        this.db.insert({
            dishname: 'Smoked Salmon',
            description: 'Smoked Salmon Dish.',
            chefSpecial: true,
            vegetarian: false,
            menu: 'lunch',
            price: '8.35',
            available: false,
            ingredients: ['Crab', 'Rice', 'Butter', 'Garlic', 'Cheese', 'Onion', 'Wine'],
            allergens: ['Butter', 'Cheese', 'Wine'],

        });
        console.log("inserted Salmon");

        this.db.insert({
            dishname: 'Garlic Bread Starter',
            description: 'Smoked Salmon Dish.',
            chefSpecial: true,
            vegetarian: false,
            menu: 'lunch',
            price: '8.35',
            available: true,
            ingredients: ['Crab', 'Rice', 'Butter', 'Garlic', 'Cheese', 'Onion', 'Wine'],
            allergens: ['Butter', 'Cheese', 'Wine'],


        });

        this.db.insert({
            dishname: 'Mozarella Sticks',
            description: 'Smoked Salmon Dish.',
            chefSpecial: true,
            vegetarian: false,
            menu: 'dinner',
            price: '8.35',
            available: false,
            ingredients: ['Crab', 'Rice', 'Butter', 'Garlic', 'Cheese', 'Onion', 'Wine'],
            allergens: ['Butter', 'Cheese', 'Wine'],
    

        });
        console.log("inserted Mozzarella Sticks");

        this.db.insert({
            dishname: 'Pizza',
            description: 'Smoked Salmon Dish.',
            chefSpecial: true,
            vegetarian: false,
            menu: 'lunch',
            price: '8.35',
            available: false,
            ingredients: ['Crab', 'Rice', 'Butter', 'Garlic', 'Cheese', 'Onion', 'Wine'],
            allergens: ['Butter', 'Cheese', 'Wine'],

        });
        console.log("inserted Pizza");
    }

    // function to return all entries from the database
    getLunchMenus() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({menu: 'lunch', available: true}, function (err, LunchMenus) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(LunchMenus);
                    //to see what the returned data looks like
                //   console.log('function all() returns: ', LunchMenus);
                }
            })
        })
    }


    
    getAllLunchMenus() {
        return new Promise((resolve, reject) => {
            this.db.find({menu: 'lunch'}, function (err, LunchMenus) {
                if (err) {
                    reject(err);
                } else {
                    resolve(LunchMenus);
               
                }
            })
        })
    }


    getDinnerMenus() {
        return new Promise((resolve, reject) => {
            this.db.find({menu: 'dinner', available: true}, function (err, DinnerMenus) {
                if (err) {
                    reject(err); 
                } else {
                    resolve(DinnerMenus);
                }
            })
        })
    }


     getAllDinnerMenus() {
        return new Promise((resolve, reject) => {
            this.db.find({menu: 'dinner'}, function (err, DinnerMenus) {
                if (err) {
                    reject(err);
                } else {
                    resolve(DinnerMenus);
                }
            })
        })
    }

     
     getAllMenus() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, DinnerMenus) {
                if (err) {
                    reject(err);
                } else {
                    resolve(DinnerMenus);
                }
            })
        })
    }

    addFood(dishname, description, chefSpecial, vegetarian, menu, price, available) {
        var entry = {
            dishname: dishname,
            description: description,
            chefSpecial: chefSpecial,
            vegetarian: vegetarian,
            menu: menu,
            price: price,
            available: available
        }
        console.log('entry created', entry);
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, {}, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                   console.log('deleted');
                }
            })
        })
    }
    
    updateMenu(id, available){
        available = !available;
        return new Promise((resolve, reject) => {
            this.db.update({ _id: id }, { $set: { available: available } }, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
    })
}
}

module.exports = Menu;