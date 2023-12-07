// database.js
const mysql = require('mysql2');

var connections = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs_login",
})

connections.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as ID ' + connections.threadId);
});

module.exports = connections;
