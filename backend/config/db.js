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
    } else {
        console.log("Database connected");
        db.query("SHOW COLUMNS FROM orderdetails LIKE 'size'", (err, results) => {
            if (!err && results.length === 0) {
                db.query(
                    "ALTER TABLE orderdetails ADD COLUMN size ENUM('S','M','L') DEFAULT 'M'",
                    (alterErr) => {
                        if (alterErr) console.log("Lỗi thêm cột size:", alterErr.message);
                        else console.log("Đã thêm cột 'size' vào bảng orderdetails");
                    }
                );
            }
        });
    }
});

module.exports = db;