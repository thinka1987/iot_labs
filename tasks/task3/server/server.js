const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
var cors = require('cors');

app.use(cors());
 
// parse application/json
app.use(bodyParser.json());
 
//create connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "your_password",
  database: "sensor_data"
});

 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//select last 51 records
app.get('/measurement',(req, res) => {
  let sql = "SELECT * FROM data order by date_time DESC limit 5";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
});
 


// link to browser port
app.listen(3001, () => {
    console.log('App listening on http://localhost:3001/measurement')
})

