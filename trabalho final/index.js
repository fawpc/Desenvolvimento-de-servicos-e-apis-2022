const express = require('express')
const usuarioController = require('./controller/usuarioController')
const bibliotecaController = require('./controller/bibliotecaController')

const app = express()
const port = 3000
//app.use(connect())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//app.use(cookieParser());


const usuarioRota = require('./rotas/usuarioRotas')
app.use('/api/usuarios',usuarioRota)

const bibliotecaRota = require('./rotas/bibliotecaRotas')
app.use('/api/biblioteca',bibliotecaRota)

app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`)
})



const authRota = require('./rotas/authRotas')
app.use('/api/auth', authRota)

app.use(usuarioController.validarToken)