/*
 *  All database functionality for app.js
 */

const helpers = require('./helpers');

module.exports = {
    
    /**
     * Adds entry to given table
     * @param {json} obj
     * @param {int} option
     */
    addToTable: function(connection, obj, table) { 
        return new Promise((resolve, reject) => {
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
    },
    
    /*
     * Get all entries of given table
     * @param {string} table
     */
    
    getAll: function(connection, table) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + table;
            connection.query(query, function(err, results) {
                if (!err) {
                    resolve(results);
                } else {
                    console.log(err);
                    reject(err);
            }});
        });
    },
    
    /**
     * Returns array with all matches from given table
     * 'obj' object contains any valid fields in the given table with
     *      their corresponding values
     * @param {JSON} obj
     * @return {Array} rows
     */
    getFromTable: function(connection, obj, table) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + table + ' WHERE ' + helpers.formatLIKEs(obj);
            connection.query(query, obj, function(err, rows) {
                if (!err) {
                    resolve(rows);
                } else {
                    console.log(err);
                    reject(err);
            }});
        });  
    },
    
    /*
     *  Returns JSON object containing total
     *  award amounts from each funding body
     *  @return {JSON} totals
     */
    getTotalFunding: function(connection, table) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + table;
            connection.query(query, function(err, rows) {
                if (!err) {
                    resolve(helpers.totalFunding(rows));
                } else {
                    console.log(err);
                    reject(err);
            }});
        });
    },
    
     /**
     * Removes matches from given table
     * @param {JSON} obj
     * @param {string} table
     */
    removeFromTable: function(connection, obj, table) { 
        return new Promise((resolve, reject) => {
            const query = 'DELETE * FROM ' + table + ' WHERE ' + helpers.formatANDs(obj);
            connection.query(query, obj, function(err, rows) {
                if (!err) {
                    resolve();
                } else {
                    console.log(err);
                    reject(err);
            }});
        });
    },
    
    /**
     * Updates info of specified entry in given table
     * @param {JSON} jsonArray
     * @param {JSON} table
     */
    updateTable: function(connection, jsonArray, table) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE ' + table + ' SET ? WHERE ' + helpers.formatANDs(jsonArray[1]);
            connection.query(query, jsonArray[0], function(err, res, rows) {
                if (!err) {
                    resolve();
                } else {
                    console.log(err);
                    reject();
            }});
        });
    },
};