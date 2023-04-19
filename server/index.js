const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3001;

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "logowanie",
});
con.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Połączono!");
});

const users = [
  { user: "admin", pass: "admin", upr: "admin" },
  { user: "user", pass: "user", upr: "user" },
  { user: "Jan", pass: "Kowalski", upr: "user" },
];

app.get("/login/:login/:password", (req, res) => {
  const login = req.params.login;
  const password = req.params.password;
  const sql = `SELECT * FROM użytkownicy WHERE login = '${login}' && pass = '${password}'`;
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err);

    res.json({ user: result.login, upr: result.upr });
  });
  res.json({ status: "niezalogowano" });
});
app.listen(port, () => {
  console.log(`aplikacja działa na porcie ${port}`);
});
