async function logowanie() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  const data = await fetch(
    `http://localhost:3001/checkpassword/${login}/${password}`
  ).then((response) => response.text());
  console.log(data);
  if (data == "admin") {
    localStorage.setItem("login", "admin");
  } else if (data == "user") {
    localStorage.setItem("login", "user");
  } else {
    localStorage.setItem("login", "nie zalogowano");
  }
}
function checklogin() {
  if (localStorage.getItem("login") != "admin") {
    window.location.href = "login.html";
  }
}
function checkuser() {
  if (localStorage.getItem("login") == "nie zalogowano") {
    window.location.href = "login.html";
  }
}
