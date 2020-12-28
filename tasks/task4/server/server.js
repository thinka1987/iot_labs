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
  database: "sensor_data",
  multipleStatements: true,
 
});

 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//select last 51 records
app.get('/measurement',(req, res) => {
  let sql = "SELECT * FROM data WHERE type ='temperature' order by date_time DESC limit 1 ; SELECT * FROM data WHERE type ='humidity' order by date_time DESC limit 1; SELECT * FROM data WHERE type ='pressure' order by date_time DESC limit 1";
  let query = conn.query(sql,[2,1,3], (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
});
app.get('/getall',(req, res) => {
  let sql = "SELECT * FROM data  order by date_time DESC LIMIT 100";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
});
app.get('/deleteoldData',(req, res) => {
  let sql = "DELETE FROM data WHERE date_time < CURDATE()";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
});

// link to browser port
app.listen(3001, () => {
    console.log('App listening on http://localhost:3001/measurement')
})

