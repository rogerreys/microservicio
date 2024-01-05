const express = require('express');
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.get("/", list);

function list(req, res) {
    Controller.list()
        .then((list) => {
            response.sucess(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Informacion invalida', 400)
        });
}
function list_by_id(){
    // TODO
}
function insert(){
    // TODO
}
function update(){
    // TODO
}

module.exports = router 