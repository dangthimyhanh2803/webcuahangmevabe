const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "babyShop"
});

db.connect((err) => {
    if (err) {
        console.log(err);
        /*console.log("Database connection failed");*/
    } else {
        console.log("Database connected");
    }
});

module.exports = db;