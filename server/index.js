const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Logowanie",
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

app.get("/get/:user/:pass", function (req, res) {
  const user = req.params.user;
  const pass = req.params.pass;

  for (let i = 0; i <= users.length - 1; i++) {
    if (users[i].user == user && users[i].pass == pass) {
      res.json({ user: user, upr: users[i].upr });
    }
  }
  res.json({ status: "niezalogowano" });
});

app.listen(port, () => {
  console.log(`aplikacja działa na porcie ${port}`);
});
