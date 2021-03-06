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
            ingredients: ['Garlic', 'Cheese', 'Onion', 'Wine', 'Beef Stock'],
            allergens: ['Butter', 'Cheese'],
        });
        console.log("inserted soup");

        this.db.insert({
            dishname: 'Macaroni and Cheese',
            description: 'A delicious nand creamy pub classic, sure to entice your taste buds!.',
            chefSpecial: true,
            vegetarian: false,
            menu: 'lunch',
            price: '8.35',
            available: true,
            ingredients: ['Macaroni', 'Milk', 'Cheese'],
            allergens: ['Butter', 'Cheese', 'Milk'],

        });
        console.log("inserted mac&cheese");

        this.db.insert({
            
            description: 'Luscious Smoked Salmon Dish. Served with cream cheese and house salad.',
            chefSpecial: true,
            vegetarian: false,
            menu: 'dinner',
            price: '7.60',
            available: true,
            ingredients: ['Salmon', 'Salad', 'Cream Cheese',],
            allergens: ['Cheese', 'Nuts'],

        });
        console.log("inserted Salmon");

        this.db.insert({
            dishname: 'Garlic Bread Starter',
            description: 'Freshly made garlic bread starter, for those feeling a little peckish.',
            chefSpecial: true,
            vegetarian: false,
            menu: 'lunch',
            price: '9.40',
            available: true,
            ingredients: ['Garlic Butter', 'Foccacia'],
            allergens: ['Butter', 'Cheese', 'Wine'],


        });

        this.db.insert({
            dishname: 'Mozarella Sticks',
            description: 'Smoked Salmon Dish.',
            chefSpecial: true,
            vegetarian: false,
            menu: 'dinner',
            price: '10.20',
            available: true,
            ingredients: ['Mozzarella', 'Bread Crumbs'],
            allergens: ['Cheese'],
    

        });
        console.log("inserted Mozzarella Sticks");

        this.db.insert({
            dishname: 'Pizza',
            description: 'Freshly baked, home made pizza..',
            chefSpecial: true,
            vegetarian: false,
            menu: 'dinner',
            price: '8.35',
            available: true,
            ingredients: ['Pizza Dough', 'Mozzarella', 'Tomato Base'],
            allergens: ['Butter', 'Cheese', 'Eggs', 'Milk'],

        });
        console.log("inserted Pizza");
    }

    // function to return lunch entries from database
    //only shows available lunches, as this method is for users at the main menu
    getLunchMenus() {
        return new Promise((resolve, reject) => {
            this.db.find({menu: 'lunch', available: true}, function (err, LunchMenus) {
                if (err) {
                    reject(err);
                } else {
                    resolve(LunchMenus);
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
            available: true,
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
                   console.log('Deleted ' + id);
                }
            })
        })
    }
    
    updateMenu(id, dishname, description, chefSpecial, vegetarian, menu, price, available, ingredients, allergens){
        return new Promise((resolve, reject) => {
            this.db.update({ _id: id }, { $set: { dishname: dishname, description: description, chefSpecial: chefSpecial, vegetarian: vegetarian, menu: menu, price: price, available: available, ingredients: ingredients, allergens: allergens  } }, function (err, doc) {
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