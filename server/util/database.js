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

module.exports = connection.promise();
