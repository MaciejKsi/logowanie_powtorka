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

app.get("/checkpassword/:login/:password", (req, res) => {
  const login = req.params.login;
  const password = req.params.password;
  const sql = `SELECT * FROM hasla WHERE Login='${login}'`;
  var passwords;
  con.query(sql, function (err, result, fields) {
    if (err) console.log(err);
    else {
      passwords = result;
      check(passwords);
    }
  });
  var zmienna;
  function check(passwords) {
    console.log(passwords.length);
    if (passwords.length == 0) {
      zmienna = "no access";
    } else {
      if (
        password == passwords[0].Password &&
        passwords[0].uprawnienia == "admin"
      ) {
        zmienna = "admin";
      } else if (
        password == passwords[0].Password &&
        passwords[0].uprawnienia == "user"
      ) {
        zmienna = "user";
      }
    }
    res.send(zmienna);
  }
});
app.listen(port, () => {
  console.log(`aplikacja działa na porcie ${port}`);
});
