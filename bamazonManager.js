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
    showProducts();
});

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(el => {
            console.log(el.item_id + " | " + el.product_name + " | " + el.department_name + " | " + el.price + " | " + el.stock_quantity);
        });
        buyUnits();
    });
}

function buyUnits() {
    inquirer.prompt([
        {
            name: "productID",
            type: "input",
            message: "Enter The ID Of the Product You Want To Buy:",

        },
        {
            name: "quantity",
            type: "input",
            message: "Enter The Quantity Of The Product You Want To Buy:",
        }
    ])
        .then(answers => {
            var itemID = parseInt(answers.productID);
            var quantity = parseInt(answers.quantity);

            connection.query("SELECT * FROM products WHERE item_id=?", [itemID], function (err, res) {
                if (err) throw err;

                if (quantity > res[0].stock_quantity) {
                    console.log("Insufficient Quantity Please Shop Again");
                    keepShopping();
                }
                else {
                    var newQuantity = res[0].stock_quantity - quantity;
                    var totalCost = res[0].price * newQuantity;
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
                            if (err) throw err;
                            console.log("You bought " + quantity + " units of " + productName + "." + " The subtotal is: $" + totalCost);
                            keepShopping();

                        }
                    );
                }

            });
        });

}

function keepShopping() {

    inquirer.prompt([
        {
            name: "keepShop",
            type: "input",
            message: "Do You Want To Keep Shopping (yes) / (no) ?",

        }
    ]).then(answers => {
        if (answers.keepShop === "no") {
            connection.end();

        }
        else {
            showProducts();
        }
    });

}