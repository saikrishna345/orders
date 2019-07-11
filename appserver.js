var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var app = express();
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.json());
 var cors = require('cors');
//  var corsOptions = {
//      origin: "http://localhost:4200",
//      optionsSuccessStatus: 200
//  }
//  app.use(cors(corsOptions));
 app.use(cors());
 const saltRounds = 10;

var mysqlconnection = mysql.createConnection({
host: 'localhost',
user:'root',
password: 'krish',
port: 3306,
database: 'mydatabase',
multipleStatements: true
})

mysqlconnection.connect((err) =>{
    if(err){
        console.log('Connection unavailable' + err);
    } else{
        console.log('Db connection succeeded');
    }
})


app.listen(3001,()=> console.log('server listening to port number 3001'));

// session login
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// get employees
app.get('/users',function(req,res){
 mysqlconnection.query('SELECT * FROM users',(err,rows,fields)=>{

if(err){
    console.log(err);
}
else {
res.json(rows);
}
 })
});


// get employees by id
app.get('/users/:id',function(req,res) 
{
var id =req.params.id;

mysqlconnection.query('SELECT * FROM  users where Id =?',id ,(err,rows,fields)=>{
    if(err){
        console.log(err);

    } else {
        res.send(rows);
    }
})

});

// delete employee by id
app.delete('/users/:id',function(req,res){
    var userid= req.params.id;
    mysqlconnection.query("DELETE  FROM  users where Id = ?",[userid],(err,rows,fields)=>{
        if(err){
            console.log(err);
    
        } else {
            res.status(200).send(rows);
        }
    })
    
});

// post employee by id
app.post('/users',function(req,res){
 var userdata= {
    Firstname: req.body.firstName,
    LastName: req.body.LastName,
    email: req.body.email,
    Password: req.body.Password,
    Gender: req.body.Gender,
    phoneNo: req.body.PhoneNo
 }
//  res.send(userdata);
    var user= userdata;
        bcrypt.hash(user.Password,8,function(err,hash){
            if(err){
                console.log(err);
            }
            else{
            console.log(hash);
           // user.Password = hash;
            mysqlconnection.query('INSERT INTO users SET ?',user,(err,rows,fields)=>{
                console.log(err);
                    var payload = {subject: user._id,}
                    var token = jwt.sign(payload,'secretKey');
                    res.status(200).send({token});
        })
    }
        });
});


// update employee using id
app.put('/users',function(req,res){
   // reqbody= req.body;
    reqid= req.params.id;
    mysqlconnection.query('UPDATE users SET Firstname = ?,Lastname = ?,email = ?,password = ?,gender = ?,PhoneNo = ?, WHERE Id= ?', [[FirstName,Lastname,email,password,gender,phoneNo], reqid ],(err,rows,fields)=>{
   if(err){
       res.status(400).send(err);
   } else{
       res.send(rows);
   }
    });
});


 // login  authentication
 app.post('/login', function(req, res) {
	var email = req.body.email;
    var password = req.body.Password;
	if (email && password) {
        mysqlconnection.query('select * FROM users WHERE email = ? AND Password = ?', [email, password], function(error, results, user) {
			if (results.length > 0) {
				req.session.loggedin = true;
                req.session.email = email;
                    var payload = {subject: user._id,}
                    var token = jwt.sign(payload,'secretKey');
                    res.status(200).send({token});
        			} else {
				res.status(404).send('Incorrect email and/or Password!');
			}			
        // res.json('password matched');     
		});
	} 
});


