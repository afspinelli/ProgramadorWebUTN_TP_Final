var pool = require('./bd');
var md5 = require('md5');

async function getUserByUsernameAndPassword(userReturn, passwordReturn) {
    try {
        var query = 'select * from users where user = ? and password = ? limit 1';
        var rows = await pool.query(query, [userReturn, md5(passwordReturn)]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = { getUserByUsernameAndPassword }