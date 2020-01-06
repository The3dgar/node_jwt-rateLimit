const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const path = require('path');
const rateLimit = require('express-rate-limit')
const llave = 'Llavecita'

// config
const puerto = 3000;
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  onLimitReached: (req, res, options) => { 
    console.log(`Esta ip esta haciendo muchas peticiones ${req.ip} , options: ${options.max}`) 
  },
});
// Middlewares

// rate-limit

// para todas las rutas
// app.use(apiLimiter)

// para rutas relacionadas con '/api'
app.use("/api/", apiLimiter);

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET,POST')
  next()
})

// RUTAS
app.get('/api', (req, res) => {

  res.json({
    mensaje: "hola"
  })
})

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    mensaje: "Hola amigo",
    time: new Date().toLocaleString()
  }
  const token = jwt.sign({ user }, llave, {
    expiresIn: 20
  })

  res.json({
    user,
    token
  })
})

app.post('/api/user', (req, res) => {
  const user = req.body

  const token = jwt.sign({ user }, llave, {
    expiresIn: 20
  })

  res.json({
    success: true,
    user,
    token
  })
})

app.get('/api/protected', ensureToken, (req, res) => {
  res.json({
    id: 1,
    nombre: "Edgar Olivar"
  })
})

function ensureToken(req, res, next) {
  // console.log(req.headers)
  const bearerHeader = req.headers['authorization']
  // console.log(bearerHeader, "Funcion")
  if (typeof bearerHeader !== "undefined") {
    req.token = bearerHeader;

    jwt.verify(req.token, llave, (err, data) => {
      if (err) {
        res.sendStatus(403)
      } else {
        next()
      }
    })


  } else {
    res.sendStatus(403)
  }
}

app.use("/", express.static(path.join(__dirname, 'frontend')));

app.listen(puerto, () => {
  console.log("Server ON")
})
