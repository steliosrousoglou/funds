/*
 * Helper methods of app.js
 */

module.exports = {
    callUpdate: function (json) {
        var params = {};
        var updates = {};
        var split = false;
        for (var key in json) {
            if (json[key] == null || json[key] == '') continue;
            else if (split) {
                updates[key] = json[key];
            } else if (key == "split"){
                split = true;
            } else {
                params[key] = json[key];
            }
        }
        return [updates, params];
    },
    
    /*
     * Takes in JSON object, returns a formatted string of
     * AND statements of all key-value pairs (for SQL search use)
     * @param {json} post
     * @return {string} st 
     */
    formatANDs: function(obj) {
        var st = '';
        for(var x in obj)
            st += '\`' + x + (isNaN(obj[x]) ? '\`= \'' + obj[x] + '\' AND ' : '\`= ' + obj[x] + ' AND ');
        return st.slice(0, -4);
    },

    /*
     * Takes in JSON object, returns a formatted string of 
     * AND - LIKE statements of all key-value pairs (for SQL pattern matching)
     * @param {json} post
     * @return {string} st 
     */
    formatLIKEs: function(post) {
        var st = '';
        for(var x in post)
            st += '\`' + x + (isNaN(post[x]) ? '\`LIKE \'%' + post[x] + '%\' AND ' : '\`= ' + post[x] + ' AND ');
        return st.slice(0, -4);
    },
    
    totalFunding: function(rows) {
        var dict = {};
        for (var i = 0; i < rows.length; i++) {
            dict[rows[i].Body] = (dict[rows[i].Body] || 0) + rows[i].amount;
        }
        return dict;
    },
};