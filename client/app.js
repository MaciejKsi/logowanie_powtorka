async function getUser() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  const data = await fetch(`http://localhost:3001/login/${login}/${password}`);
  const json = await data.json();
  console.log(json);

  if (json.user != undefined) {
    localStorage.setItem("upr", JSON.stringify(json));
  } else {
    localStorage.setItem("upr", "false");
  }
}
function checkUser() {
  const user = JSON.parse(localStorage.getItem("upr"));
  if (user.upr != "admin" && window.location.href.includes("/admin.html")) {
    window.location.href = "index.html";
  }

  if (
    (user.upr != "user" || user.upr != "admin") &&
    window.location.href.includes("/user.html")
  ) {
    window.location.href = "index.html";
  }
}
