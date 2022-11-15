var mysql      = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DATABASE_NAME
});

connection.connect(err=>{
    if(err){
        console.log("Error: " + err.sqlMessage);
        return;
    }
    console.log("Database connected as id " + connection.threadId);
});

module.exports = connection;
