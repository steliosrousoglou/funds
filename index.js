/* Servers */
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

/* Database Name */
const db_name = 'funds';

/* Database Table Names */
// Award table
const tb_award = 'award_dev';
const tb_projects = 'projects_dev';

/* Create Database Connection Object*/
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'sr692',
    password: '',
    database: db_name,
});

/* Initialize App */
var app = express();

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.static('client'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Connect to Database */
connection.connect(function(err) {
    if(!err) {
        console.log("Connected to database.");
        //getAward({finance_award_no: 98765});
        //addAward("AHRC", "GRant2", "sdfasfccgdfg", 98765, "2016-05-05", "2020-05-05", 176543.76, "AS", "Aug-Oct 2018");
        //updateAward({end_date: "2023-05-03"},{funding_body_ref: 'sdfasfccgdfg'});
        //getAward({finance_award_no: 98765});
        //addProject()
        //getAllProjects = (post)
    } else {
        console.log("Error connecting to database, quitting ... \n\n");
        process.exit(1);
    }
});

/* Main methods */

/**
 * Adds award to award database - funding_body_ref, finance_award_no unique
 * @param {json} post 
 */
const addAward = post => new Promise((resolve, reject) => {
    const query = 'INSERT INTO ' + tb_award + ' SET ?';
    
    connection.query(query, post, function(err, rows) {
        if (!err) {
            console.log('Added Award');
            resolve();
        }
        else {
            console.log(err);
            reject();
        }
    });
});

/**
 * Returns awards array with all matches
 * 'post' object contains any *one* valid field in the awards table with
 *      its corresponding value. e.g. to search for award with
 *      funding_body_ref = 12345: getAward({funding_body_ref: 12345})
 * @param {JSON} post
 * @return {Array} rows
 */
const getAward = post => new Promise((resolve, reject) => {
    console.log(post);
    const query = 'SELECT * FROM ' + tb_award + ' WHERE ?';
    connection.query(query, post, function(err, rows) {
        if (!err) {
            console.log(rows[0]);
            resolve(rows[0]);
        } else {
            console.log(err);
            reject(err);
    }});
});

/**
 * Updates info of specified award
 * 'post' object contains any number of valid fields in
 *      the awards table with its corresponding new values.
 * 'which' object contains identifying info of award to be modified
 *      (can be any unique field of award)
 * e.g. to change the name of award with funding_body_ref 12345:
 *      updateAward({Name: "new name"}, {funding_body_ref: 12345})
 * @param {JSON} post
 * @param {JSON} which
 */
const updateAward = (post, which) => {
    const query = 'UPDATE ' + tb_award + ' SET ? WHERE ?';
    connection.query(query, [post, which], function(err, results) {
        if (!err) {
            console.log(results);
        } else {
            console.log(err);
    }});
};

/**
 * Adds row to projects database - student-project combination unique
 * @param {String} funding_body_ref
 * @param {Number} finance_award_no
 * @param {Number} my_finance_code
 * @param {Enum} Type
 * @param {Number} EPSRC_voucher
 * @param {String} Department
 * @param {Number} award_amount
 * @param {String} student_name
 * @param {Enum} jes
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {Number} industry_account
 * @param {String} fes_due
 * @param {String} supervisor
 * @param {String} industrial_partner
 */
const addProject = (funding_body_ref, finance_award_no, my_finance_code, Type, EPSRC_voucher, Department, award_amount, student_name, jes, start_date, end_date, industry_account, form_s, supervisor, industrial_partner) => {
    const post = {funding_body_ref, finance_award_no, my_finance_code, Type, EPSRC_voucher, Department, award_amount, student_name, jes, start_date, end_date, industry_account, form_s, supervisor, industrial_partner};
    const query = 'INSERT INTO ' + tb_projects + ' SET ?';

    connection.query(query, post, function(err, rows) {
        if (!err)
            console.log('Added Project');
        else
            console.log(err);
    });
};

/**
 * Returns all project row matches (query is anything)
 * 'post' object contains any one valid field in the projects table with
 *      its corresponding value.
 * e.g. to search for funding_body_ref = 12345,
 *      call the method as follows: getProjects({funding_body_ref: 12345})
 * @param {JSON} post
 * @return {Array} sum
 */
const getAllProjects = (post) => {
    const query = 'SELECT * FROM ' + tb_projects + ' WHERE ?';
    connection.query(query, post, function(err, rows) {
        if (!err) {
            console.log(rows);
            return rows;
        } else {
            console.log(err);
    }});
};

/*
 * Endpoint to add award
 */
app.post('/add_award', (req, res) => {
  addAward(req.body)
  .then(() => res.send())
  .catch(() => res.send('fail'));
});

/*
 * Endpoint to get award
 */
app.post('/get_award', (req, res) => {
  getAward(req.body)
  .then(res => res.send(res))
  .catch(() => res.send('fail'));
});


/* Listen */
app.listen(process.env.PORT);