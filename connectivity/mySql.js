var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'rtcv2'
});

connection.connect(err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Connected as id " + connection.threadId);
});

module.exports = connection;
