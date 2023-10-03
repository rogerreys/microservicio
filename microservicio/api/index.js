// LIBRERIAS
const express = require('express');
const swaggerUi = require('swagger-ui-express');
var bodyParser = require('body-parser')

// RECURSOS
const swaggerDoc = require('./openapi_swagger.json');
const config = require('../config.js');
const user = require('./components/user/network.js');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//ROUTER
app.use('/api/user', user );
// Documentation api user
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(config.api.port, ()=>{
    console.log('Api escuchando en el puerto', config.api.port );
});