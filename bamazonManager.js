var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    manageProducts();
});

function manageProducts() {
    inquirer.prompt([
        {
            name: "managerView",
            type: "list",
            message: "Select An Option To Perform:",
            choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"]

        }
    ])
        .then(answers => {
            if (answers.managerView === "View Products For Sale") {
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    res.forEach(el => {
                        console.log(el.item_id + " | " + el.product_name + " | " + el.department_name + " | " + el.price + " | " + el.stock_quantity);

                    });
                    manageProducts();
                });

            }
            else if (answers.managerView === "View Low Inventory") {

                connection.query("SELECT * FROM products", function (err, res) {
                    var trigger = false;
                    if (err) throw err;
                    res.forEach(el => {
                        if (parseInt(el.stock_quantity) < 5) {
                            console.log(el.item_id + " | " + el.product_name + " | " + el.department_name + " | " + el.price + " | " + el.stock_quantity);
                            trigger = true;
                        }
                    });
                    if (!trigger) {
                        console.log("No Items Has Low Inventory");
                    }
                    manageProducts();
                });

            }
            else if (answers.managerView === "Add To Inventory") {
                inquirer.prompt([
                    {
                        name: "productID",
                        type: "input",
                        message: "Enter ID Of Product From Inventory:",
                    },
                    {
                        name: "quantity",
                        type: "input",
                        message: "Enter Quantity Of Product To Add To Inventory:",
                    }
                ]).then(ans => {

                    var itemID = ans.productID;
                    connection.query("SELECT * FROM products WHERE item_id=?", [itemID], function (err, res) {

                        if (err) throw err;
                        var quantity = parseInt(res[0].stock_quantity);
                        var quan = parseInt(ans.quantity);
                        var newQuantity = parseInt(quan + quantity);
                        var productName = res[0].product_name;
                        var query = connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newQuantity
                                },
                                {
                                    item_id: itemID
                                }
                            ],
                            function (err, res) {
                                console.log(quan + " Of " + productName + " Got Stored In The Inventory")
                                manageProducts();
                            });
                    });
                });
            }
            else if (answers.managerView === "Add New Product") {
                inquirer.prompt([
                    {
                        name: "product",
                        type: "input",
                        message: "Enter Product To Add To Inventory:",
                    },
                    {
                        name: "department",
                        type: "input",
                        message: "Enter Department Of Product:",
                    },
                    {
                        name: "price",
                        type: "input",
                        message: "Enter Price Of Product:",
                    },
                    {
                        name: "stock",
                        type: "input",
                        message: "Enter Stock Count Of Product:",
                    }
                ]).then(ans => {

                    var query = connection.query(
                        "INSERT INTO products SET ?",
                        {
                            product_name: ans.product,
                            department_name: ans.department,
                            price: ans.price,
                            stock_quantity: ans.stock
                        },
                        function (err, res) {
                            if (err) throw err;

                            console.log("Product Added!");
                            manageProducts();
                        }
                    );
                });
            }
            else {
                connection.end();
            }

        });

}

