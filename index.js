/* Servers */
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

/* Database Name */
const db_name = 'funds';

/* Database Table Names */
// Award table
const tb_award = 'award_dev';
const tb_partners = 'partners_dev';
const tb_projects = 'projects_dev';

/* Create Database Connection Object*/
var connection = mysql.createConnection({
    host: process.env.IP,
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
        
        //getAward({finance_award_no: '*'});
        //addAward("AHRC", "GRant2", "sdfasfccgdfg", 98765, "2016-05-05", "2020-05-05", 176543.76, "AS", "Aug-Oct 2018");
        //updateAward({end_date: "2023-05-03"},{funding_body_ref: 'sdfasfccgdfg'});
        //getAward({finance_award_no: 98765});
        //addProject()
        //addAward({Body: "EPSRC", Name: "GRant1", funding_body_ref: "ABCBA", finance_award_no: 12309, start_date: "2018-05-05", end_date: "2022-05-05", amount: 333333, status: "KP", fes_due: "Sep-Nov 2020"});
        //getAllProjects = (post)
        getTotalFunding();
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
    const query = 'SELECT * FROM ' + tb_award + ' WHERE ?';
    connection.query(query, post, function(err, rows) {
        if (!err) {
            console.log(rows);
            resolve(rows);
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
const updateAward = (post, which) => new Promise((resolve, reject) => {
    const query = 'UPDATE ' + tb_award + ' SET ? WHERE ?';
    connection.query(query, [post, which], function(err, results) {
        if (!err) {
            console.log(results);
            resolve();
        } else {
            console.log(post);
            console.log(which);
            console.log(err);
            reject();
    }});
});

const getAllAwards = () => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + tb_award;
    connection.query(query, function(err, results) {
        if (!err) {
            console.log(results);
            resolve(results);
        } else {
            console.log(err);
            reject(err);
    }});
});

/**
 * Adds row to projects database - student-project combination unique
 * @param {JSON} post
 */
const addProject = (post) => new Promise ((resolve, reject) => {
    const query = 'INSERT INTO ' + tb_projects + ' SET ?';

    connection.query(query, post, function(err, rows) {
        if (!err)
            console.log('Added Project');
        else
            console.log(err);
    });
});

/*
 * Returns all project row matches (query is anything)
 * 'post' object contains any one valid field in the projects table with
 *      its corresponding value.
 * e.g. to search for funding_body_ref = 12345,
 *      call the method as follows: getProjects({funding_body_ref: 12345})
 * @param {JSON} post
 * @return {Array} sum
 */
const getAllProjects = (post) => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + tb_projects + ' WHERE ?';
    connection.query(query, post, function(err, rows) {
        if (!err) {
            console.log(rows);
            resolve(rows);
        } else {
            console.log(err);
            reject(err);
    }});
});

/*
 *  Returns JSON object containing total
 *  award amounts from each funding body
 *  @return {JSON} totals
 */
const getTotalFunding = () => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + tb_award;
    connection.query(query, function(err, rows) {
        if (!err) {
            var dict = {};
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i].Body);
                dict[rows[i].Body] = (dict[rows[i].Body] || 0) + rows[i].amount;
            }
            console.log(JSON.stringify(dict));
            resolve(dict);
        } else {
            console.log(err);
            reject(err);
    }});
});

/*
 * Endpoint to add award
 */
app.post('/add_award', (req, res) => {
  addAward(req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail')
  });
});

/*
 * Endpoint to get award
 */
app.post('/get_award', (req, res) => {
  getAward(req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  })
});

/*
 * Endpoint to get all awards
 */
app.post('/get_all_awards', (req, res) => {
  getAllAwards()
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  })
});

/*
 * Endpoint to update award
 */
 function callUpdate (json) {
     console.log("updating call");
     console.log(typeof(json));
     console.log(json);
     var jsonObj = json;
     var params = {};
     var updates = {};
     var split = false;
     for (var key in jsonObj) {
         if (jsonObj[key] == '' || jsonObj[key] == null) continue;
         else if (split) {
             updates[key] = jsonObj[key];
         }
         else if (key == "split"){
             split = true;
         }
         else {
             params[key] = jsonObj[key];
         }
     }
     var jsonParams = JSON.stringify(params);
     var jsonUpdates = JSON.stringify(updates);
     console.log("params " + typeof(jsonParams));
     console.log("updates " + typeof(jsonUpdates));
     return updateAward(updates, params);
 }
 
app.post('/update_award', (req, res) => {
    console.log("reached this endpoint");
    // console.log("req body is" + req.body+ "at line 237");
    // console.log("req is " + req)
    // console.log(JSON.parse(req.body));
//   updateAward(JSON.parse(req.body)["updates"], JSON.parse(req.body)["params"])
    callUpdate(req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  })
});

/*
 * Endpoint to add award
 */
app.post('/add_project', (req, res) => {
  addProject(req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail')
  });
});

/*
 * Endpoint to get project
 */
app.post('/get_project', (req, res) => {
  getAllProjects(req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_total_funding', (req, res) => {
    getTotalFunding()
    .then(res => JSON.stringify(res))
    .then(s => res.send(s))
    .catch(e => {
      console.log(e);
      res.send('fail');
  })
});

/* Listen */
app.listen(process.env.PORT);