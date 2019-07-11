Order management system [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.
--------------------------------------------------------------------------------------------
technologies used: Angular 6, Angular Material, Node js

once project is installed change the directory
----------------------------------------------
cd Order-managementsystem

installed packages
------------------
npm install -g --save @angular/cli@6.1.1


npm install -g --save body-parser


npm install -g --save express


npm install -g --save express-session


npm install -g --save hammerjs


npm install -g --save jsonwebtoken


npm install -g --save mysql


npm install -g --save cors


npm install -g --save path


npm install -g --save json-server


npm install -g --save @angular/material@6.0.2 @angular/cdk@6.0.2 @angular/animations@6.0.2




Register and login process
---------------------------
create mysql table to store registered user
--------------------------------------------
CREATE DATABASE mydatabase;

USE mydatabase;

please change the password in appserver.js file with your Mysql database password

CREATE TABLE users(  
   Id INT NOT NULL AUTO_INCREMENT,  
   Firstname VARCHAR(100) NOT NULL,  
   LastName VARCHAR(100) NOT NULL,  
   email VARCHAR(100) NOT NULL,
   Password VARCHAR(100) NOT NULL,
   Gender VARCHAR(100) NOT NULL,
   phoneNo VARCHAR(100) NOT NULL,
   PRIMARY KEY ( Id )  
);  


INSERT INTO users (Id,Firstname,LastName,email,Password,Gender,phoneNo) VALUES(1,'sai','krishna',
'saikrishnamulkanuri5@gmail.com','krish123','Male','7386477003');

SELECT * FROM users;


Run application in three terminals
----------------------------------

To Run Node server in appserver.js file (url : http://localhost:3001/users )
-------------------------------------------------------
Run command in first terminal
-----------------------------
node appserver


To Run json-server to get Mock data from db.json file (url : http://localhost:3000/orders-list)
-----------------------------------------------------------------------------
Run command in second terminal
------------------------------
json-server --watch db.json


Run the Angular application in third termial (url: http://localhost:4200)
-----------------------------------------------------------------
ng serve

Note
-----
* Validation is done for only Login page

* Once application is Opened home page is Register 

* check the three servers(node,angular,json-server) are running fine

* Register as user

* Once registeration is done it will redirect to login page

* Login with the registered user email and password else it will through error and will not redirect

* After login is done it will redirect to orders page

* In orders page you add new orders by clicking + New Order button and edit orders by Edit button and delete by Delete button

* Open the side nav bar to logout









