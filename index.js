/* Servers */
var express = require('express');
var mysql = require('mysql');

/* Database Name */
const db_name = 'funds';

/* Database Table Names */
// Award table
const tb_award = 'award_dev';
const tb_projects = 'projects_dev';

/* Create Database Connection */
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'sr692',
    password: '',
    database: db_name,
});

var app = express();

connection.connect(function(err) {
    if(!err) {
        console.log("Connected to database.");addAward("AHRC", "GRant2", "sdfasfccgdfg", 98765, "2016-05-05", "2020-05-05", 176543.76, "AS", "Aug-Oct 2018");
    } else {
        console.log("Error connecting to database, quitting ... \n\n");
        process.exit(1);
    }
 }); 
 
 /* Main methods */
 
 // Adds award to award database - funding_body_ref, finance_award_no unique
 const addAward = (Body, Name, funding_body_ref, finance_award_no, start_date, end_date, amount, status, fes_due) => {
     const post = {Body, Name, funding_body_ref, finance_award_no, start_date, end_date, amount, status, fes_due};
     const query = 'INSERT INTO ' + tb_award + ' SET ?'
     
     connection.query(query, post, function(err, rows, fields) {
         if (!err)
           console.log('Added Award');
         else
           console.log(err);
       });
 }
 
  // Adds row to projects database - student-project combination unique
 const addProject = (funding_body_ref, finance_award_no, my_finance_code, Type, EPSRC_voucher, Department, award_amount, student_name, jes, start_date, end_date, industry_account, form_s, supervisor, industrial_partner) => {
     const post = {funding_body_ref, finance_award_no, my_finance_code, Type, EPSRC_voucher, Department, award_amount, student_name, jes, start_date, end_date, industry_account, form_s, supervisor, industrial_partner};
     const query = 'INSERT INTO ' + tb_projects + ' SET ?'
     
     connection.query(query, post, function(err, rows, fields) {
         if (!err)
           console.log('Added Project');
         else
           console.log(err);
       });
 }
 
/* Listen */
app.listen(3000);