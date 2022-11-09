const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'e1em3nt@!_cry$t@!',
        database: 'guild_db'
    }
)

connection.connect(err => {
    if (err) throw err;
    console.log('Database is connected.');
});

module.exports = connection;