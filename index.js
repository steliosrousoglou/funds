/* Servers */
var express = require('express');
var mysql = require('mysql');

/* Database Names */
// Award database
const award = 'test5';

//create DB connection info
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'sr692',
    password: '',
    database: 'funds',
});

// initialize application
var app = express();

// connect to DB, either successful or error
// queries, connections all take err as NULL argument but taking a value if error occurs
connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");
     //addAward("AHRC", "GRant2", "sdfasfccgdfg", 98765, "2016-05-05", "2020-05-05", 176543.76, "AS", "Aug-Oct 2018");
     //createTable();  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 }); 
 
 // Adds award to award database - funding_body_ref, finance_award_no unique
 const addAward = (Body, Name, funding_body_ref, finance_award_no, start_date, end_date, amount, status, fes_due) => {
     const post = {Body, Name, funding_body_ref, finance_award_no, start_date, end_date, amount, status, fes_due};
     const query = 'INSERT INTO ' + award + ' SET ?'
     
     connection.query(query, post, function(err, rows, fields) {
         if (!err)
           console.log('Added Award');
         else
           console.log(err);
       });
 }
 
 const createTable = () => {
     connection.query('CREATE TABLE test5 (Body VARCHAR(10) NOT NULL, Name VARCHAR(70) NOT NULL, funding_body_ref VARCHAR(20) NOT NULL UNIQUE, finance_award_no INT UNIQUE, start_date DATE, end_date DATE, amount DOUBLE(10,2), status VARCHAR(5), fes_due VARCHAR(15))', function(err, rows) {
         if (!err)
           console.log('Table created');
         else
           console.log(err);
       });
 }
 

app.listen(3000);