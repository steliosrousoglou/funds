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
        console.log("Connected to database.");
        //getAward({finance_award_no: 98765});
        //addAward("AHRC", "GRant2", "sdfasfccgdfg", 98765, "2016-05-05", "2020-05-05", 176543.76, "AS", "Aug-Oct 2018");
        //updateAward({Name: "GRant2", Body: 'EPSRC'},{funding_body_ref: 'sdfasfccgdfg'});
        //getAward({finance_award_no: 98765});
    } else {
        console.log("Error connecting to database, quitting ... \n\n");
        process.exit(1);
    }
});

/* Main methods */

/**
 * Adds award to award database - funding_body_ref, finance_award_no unique
 * @param {String} Body
 * @param {String} Name
 * @param {String} funding_body_ref
 * @param {Number} finance_award_no
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {Number} amount
 * @param {String} status
 * @param {Date Range} fes_due
 */
const addAward = (Body, Name, funding_body_ref, finance_award_no, start_date, end_date, amount, status, fes_due) => {
    const query = 'INSERT INTO ' + tb_award + ' SET ?'
    const post = {Body, Name, funding_body_ref, finance_award_no, start_date, end_date, amount, status, fes_due};
    
    connection.query(query, post, function(err, rows) {
        if (!err)
            console.log('Added Award');
        else
            console.log(err);
    });
};

/**
 * Returns awards array with all matches
 * 'post' object contains any *one* valid field in the awards table with
 *      its corresponding value. e.g. to search for award with
 * funding_body_ref = 12345: getAward({funding_body_ref: 12345})
 * @param {JSON object} post
 * @return {Array} rows
 */
const getAward = post => {
    const query = 'SELECT * FROM ' + tb_award + ' WHERE ?';
    connection.query(query, post, function(err, rows) {
        if (!err) {
            console.log(rows);
            return rows;
        } else {
            console.log(err);
    }});
};

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
 * Returns project row with any matches
 * 'post' object contains any one valid field in the projects table with
 *      its corresponding value.
 * e.g. to search for funding_body_ref = 12345,
 *      call the method as follows: getProjects({funding_body_ref: 12345})
 * @param {JSON object} post
 * @return {Array} sum
 */
const getProjects = (post) => {
    const query = 'SELECT * FROM ' + tb_projects + ' WHERE ?';
    connection.query(query, post, function(err, rows) {
        if (!err) {
            console.log(rows);
            return rows;
        } else {
            console.log(err);
    }});
};

/* Listen */
app.listen(3000);