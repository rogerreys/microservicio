const express = require("express")
const bodyParser = require("body-parser")

const config = require("../config")
const mysql = require("./network")

const app = express()

app.use(bodyParser.json());
app.use("/", mysql)

// RUTAS
app.listen(config.mysqlService.port, ()=>{
    console.info("Servicio MySql escuchando en el puerto", config.mysqlService.port)
})
