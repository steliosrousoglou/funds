/* Servers */
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

/* Method files */
const helpers = require('./helpers.js');
const sql = require('./sql.js');

/* Database Name */
const db_name = 'funds';

/* Database Table Names */
const tb_allocations = 'allocations_dev';
const tb_awards = 'awards_dev';
const tb_collaborators = 'collaborators_dev';
const tb_students = 'students_dev';

/* Create Database Connection Object */
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

/*
 * Add endpoints
 */

app.post('/add_allocation', (req, res) => {
  sql.addToTable(connection, req.body, tb_allocations)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/add_award', (req, res) => {
  sql.addToTable(connection, req.body, tb_awards)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/add_collaborator', (req, res) => {
  sql.addToTable(connection, req.body, tb_collaborators)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/add_student', (req, res) => {
  sql.addToTable(connection, req.body, tb_students)
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
  sql.getFromTable(connection, req.body, tb_allocations)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_award', (req, res) => {
  sql.getFromTable(connection, req.body, tb_awards)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_collaborator', (req, res) => {
  sql.getFromTable(connection, req.body, tb_collaborators)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_student', (req, res) => {
  sql.getFromTable(connection, req.body, tb_students)
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
  sql.updateTable(connection, helpers.callUpdate(req.body), tb_allocations)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/update_award', (req, res) => {
  sql.updateTable(connection, helpers.callUpdate(req.body), tb_awards)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/update_collaborator', (req, res) => {
  sql.updateTable(connection, helpers.callUpdate(req.body), tb_collaborators)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/update_student', (req, res) => {
  sql.updateTable(connection, helpers.callUpdate(req.body), tb_students)
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
  sql.removeFromTable(connection, req.body, tb_allocations)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/remove_award', (req, res) => {
  sql.removeFromTable(connection, req.body, tb_awards)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/remove_collaborator', (req, res) => {
  sql.removeFromTable(connection, req.body, tb_collaborators)
  .then(() => res.send('success'))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/remove_student', (req, res) => {
  sql.removeFromTable(connection, req.body, tb_students)
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
  sql.getAll(connection, tb_awards)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log("printing error");
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_all_allocations', (req, res) => {
  sql.getAll(connection, tb_allocations)
  .then(res => JSON.stringify(res))
  .then(s => res.send(s))
  .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

app.post('/get_all_students', (req,res) => {
    sql.getAll(connection, tb_students)
    .then(res => JSON.stringify(res))
    .then(s => res.send(s))
    .catch(e => {
        console.log(e);
        res.send('fail');
    });
});

app.post('/get_all_collaborators', (req,res) => {
    sql.getAll(connection, tb_collaborators)
    .then(res => JSON.stringify(res))
    .then(s => res.send(s))
    .catch(e => {
        console.log(e);
        res.send('fail');
    });
});

app.post('/get_total_funding', (req, res) => {
    sql.getTotalFunding(connection, tb_awards)
    .then(res => JSON.stringify(res))
    .then(s => res.send(s))
    .catch(e => {
      console.log(e);
      res.send('fail');
  });
});

/* Listen */
app.listen(process.env.PORT);
