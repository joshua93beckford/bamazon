DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hats","Clothing",10.00,120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirts","Clothing",20.00,90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants","Clothing",60.00,80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes","Clothing",100.00,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cell Phone","Electronics",500.00,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV","Electronics",6000.00,20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer","Electronics",1000.00,16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent","Outdoors",250.00,60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kyak","Outdoors",600.00,20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cannoe","Outdoors",900.00,40);

SELECT * FROM products;