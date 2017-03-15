/* Servers */
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

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
    if(!err) {
        console.log("Connected to database.");
        //getAward({finance_award_no: '*'});
        //addAward("AHRC", "GRant2", "sdfasfccgdfg", 98765, "2016-05-05", "2020-05-05", 176543.76, "AS", "Aug-Oct 2018");
        //updateAward({end_date: "2023-05-03"},{funding_body_ref: 'sdfasfccgdfg'});
        //getAward({finance_award_no: 98765});
        //addProject()
        //addAward({Body: "EPSRC", Name: "GRant1", funding_body_ref: "ABCBA", finance_award_no: 12309, start_date: "2018-05-05", end_date: "2022-05-05", amount: 333333, status: "KP", fes_due: "Sep-Nov 2020"});
        //getAllProjects = (post)
        //getTotalFunding();
    } else {
        console.log("Error connecting to database, quitting ... \n\n");
        process.exit(1);
    }
});

/* Helper Methods */

/*
 * Takes in JSON object, returns a formatted
 * string of AND statements (for SQL search use)
 * @param {json} post
 * @return {string} st 
 */
const formatANDs = post => {
    var st = '';
    for(var x in post)
        st += '\`' + x + (isNaN(post[x]) ? '\`= \'' + post[x] + '\' AND ' : '\`= ' + post[x] + ' AND ');
    return st.slice(0, -4);
}

/* Main methods */

/**
 * Adds award to awards database - funding_body_reference, myfinance_award_number unique
 * @param {json} post 
 */
const addAward = post => new Promise((resolve, reject) => {
    const query = 'INSERT INTO ' + tb_awards + ' SET ?';
    
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
 * Adds row to allocations database - unique ID offered by database
 * @param {JSON} post
 */
const addAllocation = (post) => new Promise ((resolve, reject) => {
    const query = 'INSERT INTO ' + tb_allocations + ' SET ?';

    connection.query(query, post, function(err, rows) {
        if (!err)
            console.log('Added Allocation');
        else
            console.log(err);
    });
});

/**
 * Adds row to collaborators database - myfinance_code unique
 * @param {JSON} post
 */
const addCollaborator = (post) => new Promise ((resolve, reject) => {
    const query = 'INSERT INTO ' + tb_collaborators + ' SET ?';

    connection.query(query, post, function(err, rows) {
        if (!err)
            console.log('Added Collaborator');
        else
            console.log(err);
    });
});

/**
 * Adds row to students database - unique ID offered by database (for student - project combo)
 * @param {JSON} post
 */
const addStudent = (post) => new Promise ((resolve, reject) => {
    const query = 'INSERT INTO ' + tb_students + ' SET ?';

    connection.query(query, post, function(err, rows) {
        if (!err)
            console.log('Added Student');
        else
            console.log(err);
    });
});

/**
 * Returns awards array with all matches
 * 'post' object contains any *one* valid field in the awards table with
 *      its corresponding value. e.g. to search for award with
 *      funding_body_reference = 12345: getAward({funding_body_reference: 12345})
 * @param {JSON} post
 * @return {Array} rows
 */
const getAward = post => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + tb_awards + ' WHERE ' + formatANDs(post);
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
 * Returns allocations array with all matches
 * @param {JSON} post
 * @return {Array} rows
 */
const getAllocation = post => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + tb_allocations + ' WHERE ' + formatANDs(post);
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
 * Returns collaborators array with all matches
 * @param {JSON} post
 * @return {Array} rows
 */
const getCollaborator = post => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + tb_collaborators + ' WHERE ' + formatANDs(post);
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
 * Returns students array with all matches
 * @param {JSON} post
 * @return {Array} rows
 */
const getStudent = post => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + tb_students + ' WHERE ' + formatANDs(post);
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
 *      the awards table with their corresponding new values.
 * 'which' object contains identifying info of the award to be modified
 *      (can be any unique field of award)
 * e.g. to change the name of award with funding_body_ref 12345:
 *      updateAward({Name: "new name"}, {funding_body_ref: 12345})
 * @param {JSON} post
 * @param {JSON} which
 */
const updateAward = (post, which) => new Promise((resolve, reject) => {
    const query = 'UPDATE ' + tb_awards + ' SET ? WHERE ?';
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
    const query = 'SELECT * FROM ' + tb_awards;
    connection.query(query, function(err, results) {
        if (!err) {
            console.log(results);
            resolve(results);
        } else {
            console.log(err);
            reject(err);
    }});
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
const getAllProjects = () => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + tb_allocations;
    connection.query(query, function(err, rows) {
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
    const query = 'SELECT * FROM ' + tb_awards;
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
 * Add endpoints
 */
app.post('/add_award', (req, res) => {
  addAward(req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail')
  });
});

app.post('/add_allocations', (req, res) => {
  addAllocation(req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail')
  });
});

app.post('/add_collaborators', (req, res) => {
  addCollaborator(req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail')
  });
});

app.post('/add_students', (req, res) => {
  addStudent(req.body)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail')
  });
});

/*
 * Get endpoints
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

app.post('/get_project', (req, res) => {
  getAllocation(req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_collaborator', (req, res) => {
  getCollaborator(req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

/*
 * Endpoint to get project
 */
app.post('/get_student', (req, res) => {
  getStudent(req.body)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
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

app.post('/get_all_projects', (req, res) => {
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
