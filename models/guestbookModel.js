const nedb = require('nedb');
class GuestBook {
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
            content: {
                ingredients: ['Crab', 'Rice', 'Butter', 'Garlic', 'Cheese', 'Onion', 'Wine'],
                allergyInfo: {
                    allergens: ['Butter', 'Cheese'],
                    advice: 'Contains: cheese, milk, eggs.',
                },
            },
            chefSpecial: false,
            vegetarian: true,
            menu: 'dinner',
            price: '11.50',
            available: true,
        });
        console.log("inserted soup");

        this.db.insert({
            dishname: 'Crab & Saffron Risotto',
            description: 'A seasoned crab risotto garnished with finely chopped dill.',
            content: {
                ingredients: ['Crab', 'Rice', 'Butter', 'Garlic', 'Cheese', 'Onion', 'Wine'],
                allergyInfo: {
                    allergens: ['Butter', 'Cheese', 'Wine'],
                    advice: 'Contains: dairy produce, alcohol',
                },
            },
            chefSpecial: true,
            vegetarian: false,
            menu: 'lunch',
            price: '8.35',
            available: false,

        });
        console.log("inserted risotto");
    }

    // function to return all entries from the database
    getLunchMenus() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({menu: 'lunch'}, function (err, lunchMenus) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(lunchMenus);
                    //to see what the returned data looks like
                   console.log('function all() returns: ', lunchMenus);
                }
            })
        })
    }

    // function to return all entries from the database
    getDinnerMenus() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({menu: 'dinner'}, function (err, dinnerMenus) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(dinnerMenus);
                    //to see what the returned data looks like
                   // console.log('function all() returns: ', foods);
                }
            })
        })
    }


    addEntry(author, subject, contents) {
        var entry = {
            author: author,
            subject: subject,
            contents: contents,
            published: new Date().toISOString().split('T')[0]
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

    getFoodsByMenus(menu) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'menu': menu }, function (err, menus) {
                if (err) {
                    reject(err);
                } else {
                    resolve(menus);
                    console.log('getEntriesByUser returns: ', menus);
                }
            })
        })
    }

}
module.exports = GuestBook;