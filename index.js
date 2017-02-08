var express = require('express');
var mysql = require('mysql');

//create DB connection info
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'sr692',
    password: '',
    database: 'funds',
});

//initialize application
var app = express();

//connect to DB, either successful or error
//queries, connections all take err as NULL argument but taking a value if error occurs
connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");
     addAward("AHRC", "GRant2", "sdfasfgdfg", 98765, "2016-05-05", "2020-05-05", 176543.76, "AS", "Aug-Oct 2018");
     
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 }); 
 
 const addAward = (Body, Name, funding_body_ref, finance_award_no, start_date, end_date, amount, status, fes_due) => {
     const post = {Body, Name, funding_body_ref, finance_award_no, start_date, end_date, amount, status, fes_due};
     connection.query('INSERT INTO test5 SET ?', post, function(err, rows, fields) {
         if (!err)
           console.log('Added Award');
         else
           console.log(err);
       });
 }
 

app.listen(3000);