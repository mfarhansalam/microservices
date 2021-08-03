const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');

var con = mysql.createPool({
    host: "us-cdbr-east-04.cleardb.com",
    user: "b28d060c44e16b",
    password: "41a87cf8",
    database: "heroku_5040d734006a0f4"
});

app.get('/', (req, res) => {
    con.getConnection(function(err, tempconnection) {
        if (err) { res.send("Error occured!"); } else {
            var sql = "SELECT * FROM netfreak";
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
