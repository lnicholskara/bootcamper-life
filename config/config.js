require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: "localhost",
    port: 3306,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.MYSQL_PASS,
    database: "bootcamptest_db",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: process.env.JAWS_DB_URL,
    dialect: "mysql"
  }
};
