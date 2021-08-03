const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');

var con = mysql.createPool({
    host: "us-cdbr-east-04.cleardb.com",
    user: "b9d191c32faac0",
    password: "f4a019ef",
    database: "heroku_76c19b622dd9a4e"
});

app.get('/', (req, res) => {
    con.getConnection(function(err, tempconnection) {
        if (err) { res.send("Error occured!"); } else {
            var sql = "SELECT * FROM customer";
            con.query(sql, function(err, result, fields) {
                if (err) { throw err; } else {
                    res.send(result);
                }
                tempconnection.release();
            });
        }
    });
});

app.listen(4000, () => {
    console.log('Listening ok dah jadi.');
});
