const express = require('express');
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.post("/login", login);
router.get("/debug", debug);

function login(req, res) {
    Controller.login(req.body.username, req.body.password)
        .then((list) => {
            response.sucess(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Informacion invalida', 400)
        });
}
function debug(req, res) {
    var details = {
        'id': "6",
        'name': 'Eli',
        'username': 'ei!',
        'password': 'test'
    };
    Controller.upsert(details);
    Controller.login("ei", "test").then();
}

module.exports = router;