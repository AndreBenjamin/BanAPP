/*const mysql = require('mysql2');

const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ban_app'
});

function checkUser(email, password) {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) as count FROM user_login WHERE email = ? AND password = ?`;
        connection.query(query, [email, password], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0].count === 1);
            }
        });
    });
}

module.exports = {
    checkUser: checkUser
};*/
