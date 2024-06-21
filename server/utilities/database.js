const mysql = require("mysql2");
const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "rpapp_d",
  })
  .promise();

module.exports = pool;
