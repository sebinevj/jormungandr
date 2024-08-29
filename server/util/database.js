const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');

const data = fs.readFileSync(path.join(__dirname, "../config/database.json"));
const dbConfig = JSON.parse(data);

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
    database: dbConfig.database,
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database!');
  });

module.exports = connection.promise();
