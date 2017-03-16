/* Servers */
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

/* Helper file */
const helpers = require('./helpers.js');

/* Database Name */
const db_name = 'funds';

/* Database Table Names */
// Award table

const tb_allocations = 'allocations_dev';
const tb_awards = 'awards_dev';
const tb_collaborators = 'collaborators_dev';
const tb_students = 'students_dev';

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
    if (!err) {
        console.log("Connected to database.");
    }
    else {
        console.log("Error connecting to database, quitting ... \n\n");
        process.exit(1);
    }
});

/* Main methods */

/**
 * Adds entry to given table
 * @param {json} obj
 * @param {int} option
 */
const addToTable = (table, obj) => new Promise((resolve, reject) => {
    const query = 'INSERT INTO ' + table + ' SET ?';
    connection.query(query, obj, function(err, rows) {
        if (!err) {
            resolve();
        } else {
            console.log(err);
            reject();
        }
    });
});

/**
 * Returns array with all matches from given table
 * 'obj' object contains any valid fields in the given table with
 *      their corresponding values
 * @param {JSON} obj
 * @return {Array} rows
 */
const getFromTable = (table, obj) => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + table + ' WHERE ' + formatLIKEs(obj);
    connection.query(query, obj, function(err, rows) {
        if (!err) {
            resolve(rows);
        } else {
            console.log(err);
            reject(err);
    }});
});


/**
 * Updates info of specified entry in given table
 * @param {JSON} jsonArray
 * @param {JSON} table
 */
const updateTable = (jsonArray, table) => new Promise((resolve, reject) => {
    const query = 'UPDATE ' + table + ' SET ? WHERE ' + helpers.formatANDs(jsonArray[1]);
    connection.query(query, jsonArray[0], function(err, res, rows) {
        if (!err) {
            resolve();
        } else {
            console.log(err);
            reject();
    }});
});

 /**
 * Removes matches from given table
 * @param {JSON} obj
 * @param {string} table
 */
const removeFromTable = (table, obj) => new Promise((resolve, reject) => {
    const query = 'DELETE * FROM ' + table + ' WHERE ' + helpers.formatANDs(obj);
    connection.query(query, obj, function(err, rows) {
        if (!err) {
            resolve();
        } else {
            console.log(err);
            reject(err);
    }});
});

/*
 * Get all entries of given table
 * @param {string} table
 */

const getAll = table => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + table;
    connection.query(query, function(err, results) {
        if (!err) {
            resolve(results);
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
    const query = 'SELECT * FROM ' + tb_awards;
    connection.query(query, function(err, rows) {
        if (!err) {
            resolve(helpers.totalFunding(rows));
        } else {
            console.log(err);
            reject(err);
    }});
});

/*
 * Add endpoints
 */

app.post('/add_allocation', (req, res) => {
  addToTable(tb_allocations, req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/add_award', (req, res) => {
  addToTable(tb_awards, req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/add_collaborator', (req, res) => {
  addToTable(tb_collaborators, req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/add_student', (req, res) => {
  addToTable(tb_students, req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

/*
 * Get endpoints
 */
 
app.post('/get_allocation', (req, res) => {
  getFromTable(tb_allocations, req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_award', (req, res) => {
  getFromTable(tb_awards, req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_collaborator', (req, res) => {
  getFromTable(tb_collaborators, req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_student', (req, res) => {
  getFromTable(tb_students, req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

/*
 * Update endpoints
 */

app.post('/update_allocation', (req, res) => {
  updateTable(helpers.callUpdate(req.body), tb_allocations)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/update_award', (req, res) => {
  updateTable(helpers.callUpdate(req.body), tb_awards)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/update_collaborator', (req, res) => {
  updateTable(helpers.callUpdate(req.body), tb_collaborators)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/update_student', (req, res) => {
  updateTable(helpers.callUpdate(req.body), tb_students)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

/*
 * Remove endpoints
 */

app.post('/remove_allocation', (req, res) => {
  removeFromTable(tb_allocations, req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/remove_award', (req, res) => {
  removeFromTable(tb_awards, req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/remove_collaborator', (req, res) => {
  removeFromTable(tb_collaborators, req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/remove_student', (req, res) => {
  removeFromTable(tb_students, req.json)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

/*
 * Get-All endpoints
 */
 
app.post('/get_all_awards', (req, res) => {
  getAll(tb_awards)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_all_allocations', (req, res) => {
  getAll(tb_allocations)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_all_students', (req,res) => {
    getAll(tb_students)
    .then(res => JSON.stringify(res))
    .then(s => res.send(s))
    .catch(e => {
        console.log(e);
        res.send('fail');
    });
});

app.post('/get_all_collaborators', (req,res) => {
    getAll(tb_collaborators)
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
  });
});

/* Listen */
app.listen(process.env.PORT);
