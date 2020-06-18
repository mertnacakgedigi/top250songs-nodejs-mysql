const express = require('express');
const mysql = require('mysql')

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'a1b2c3D4.',
    database :  top250songs
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
});



const app = express()
  
// app.get('/createdb', (req,res)=> {
//     let sql = "CREATE DATABASE top250songs";
//     db.query(sql, (err,result)=>{
//         if(err) throw err;
//         console.log(result)
//         res.send("database created")
//     })
// }) 

app.listen('3000',()=> {
    console.log('Server started on port 3000')
})