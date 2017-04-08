/*
 * Helper methods of app.js
 */

const callUpdate = json => {
    return [json["0"], json["1"]];
};


/*
 * Takes in JSON object, returns a formatted string of
 * AND statements of all key-value pairs (for SQL search use)
 * @param {json} post
 * @return {string} st 
 */
const formatANDs = obj => {
    var st = '';
    for(var x in obj)
        st += '\`' + x + (isNaN(obj[x]) ? '\`= \'' + obj[x] + '\' AND ' : '\`= ' + obj[x] + ' AND ');
    return st.slice(0, -4);
};

/*
 * Takes in JSON object, returns a formatted string of 
 * AND - LIKE statements of all key-value pairs (for SQL pattern matching)
 * @param {json} post
 * @return {string} st 
 */
const formatLIKEs = post => {
    var st = '';
    for(var x in post)
        st += '\`' + x + (isNaN(post[x]) ? '\`LIKE \'%' + post[x] + '%\' AND ' : '\`= ' + post[x] + ' AND ');
    return st.slice(0, -4);
};

/*
 *  Returns json object with total funding
 *  amount from each funding body
 *  @param {json} rows
 *  @return {json} dict
 */

const totalFunding = rows => {
    var dict = {};
    for (var i = 0; i < rows.length; i++) {
        dict[rows[i].Body] = (dict[rows[i].Body] || 0) + rows[i].amount;
    }
    return dict;
};

module.exports = {
    callUpdate,
    formatANDs,
    formatLIKEs,
    totalFunding,
};