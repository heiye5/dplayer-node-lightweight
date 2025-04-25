const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',      //使用localhost可能会连接失败
  user: 'root',
  password: '123456',
  database: 'danmaku_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;