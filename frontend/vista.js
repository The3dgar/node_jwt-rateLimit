function iniciarVista() {
  let cmdSolicitar = document.getElementById("cmdSolicitar")
  cmdSolicitar.addEventListener("click", () => {
    solicitarInformacion()
  })

  let cmdSalir = document.getElementById("cmdSalir")
  cmdSalir.addEventListener("click", salir)
}

function solicitarInformacion() {
  let contenido2 = document.getElementById("contenido2")
  fetch("http://localhost:3000/api/protected", {
    headers: {
      "Content-Type": "application/json",
      "authorization": localStorage.token
    },
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      contenido2.style.backgroundColor = "red"
      contenido2.innerHTML = `Bienvenido ${res.nombre}`
    })
}

function salir() {
  localStorage.clear()
  location.href = "/"
}