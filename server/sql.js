/*
 *  All database functionality for app.js
 */

const helpers = require('./helpers');

/**
 * Adds entry to given table
 * @param {json} obj
 * @param {int} option
 */
const addToTable = (connection, obj, table) => new Promise((resolve, reject) => {
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
    
/*
 * Get all entries of given table
 * @param {string} table
 */
const getAll = (connection, table) => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + table;
    connection.query(query, function(err, results) {
        if (!err) {
            // console.log(results);
            resolve(results);
        } else {
            console.log(err);
            reject(err);
    }});
});
    
/**
 * Returns array with all matches from given table
 * 'obj' object contains any valid fields in the given table with
 *      their corresponding values
 * @param {JSON} obj
 * @return {Array} rows
 */
const getFromTable = (connection, obj, table) => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + table + ' WHERE ' + helpers.formatLIKEs(obj);
    connection.query(query, obj, function(err, rows) {
        if (!err) {
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
const getTotalFunding = (connection, table) => new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + table;
    connection.query(query, function(err, rows) {
        if (!err) {
            resolve(helpers.totalFunding(rows));
        } else {
            console.log(err);
            reject(err);
    }});
});

 /**
 * Removes matches from given table
 * @param {JSON} obj
 * @param {string} table
 */
const removeFromTable = (connection, obj, table) => new Promise((resolve, reject) => {
    console.log(obj);
    console.log(typeof(obj));
    const query = 'DELETE * FROM ' + table + ' WHERE ' + helpers.formatANDs(obj);
    connection.query(query, obj, function(err, rows) {
        if (!err) {
            resolve();
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
const updateTable = (connection, jsonArray, table) => new Promise((resolve, reject) => {
    console.log(typeof(jsonArray[1]));
    console.log(jsonArray[1]);
    const query = 'UPDATE ' + table + ' SET ? WHERE ' + helpers.formatANDs(jsonArray[1]);
    connection.query(query, jsonArray[0], function(err, res, rows) {
        if (!err) {
            resolve();
        } else {
            console.log(err);
            reject();
    }});
});

module.exports = {
    addToTable,
    getAll,
    getFromTable,
    getTotalFunding,
    removeFromTable,
    updateTable,
};