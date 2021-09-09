require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5, //最大連線數，一般測試環境不會設這麼高
    queueLimit: 0,
});

module.exports = pool.promise(); // 匯出時promise包裝