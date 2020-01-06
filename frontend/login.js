let pass = document.getElementById("pass")
let login = document.getElementById("login")
let contenido = document.getElementById("contenido")


let cmdEntrar = document.getElementById("cmdEntrar")

cmdEntrar.addEventListener("click", () => {
  pass = pass.value;
  login = login.value
  if (pass != "" && login != "") {
    ingresar(login, pass)
  }
  else alert("rellene los campos")
})

async function ingresar(login, pass) {
  let jsonData = {
    login,
    pass
  }
  fetch("http://127.0.0.1:3000/api/user", {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(jsonData)
  }).then(res => res.json())
    .then(res => {
      if (res.success) localStorage.setItem("token", res.token);
      fetch('vista.html')
        .then(res => res.text())
        .then(res => {
          contenido.innerHTML = res
          iniciarVista()
        })
    })
}

if (localStorage.token) {
  fetch('vista.html')
    .then(res => res.text())
    .then(res => {
      contenido.innerHTML = res
      iniciarVista()
    })
}else{
  console.log("No logeado")
}