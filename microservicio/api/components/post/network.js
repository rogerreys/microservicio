const express = require('express');
const response = require("../../../network/response");
const Controller = require("./index");
const secure = require("./secure");

const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.post("/add", secure("add"), insert);
router.post("/:id", secure("add"), update);

function list(req, res) {
    Controller.list()
        .then((list) => {
            response.sucess(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Informacion invalida', 400)
        });
}

function get(req, res) {
    Controller.get(req.params.id)
        .then((list) => {
            response.sucess(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Informacion invalida', 400)
        });
}

function insert(req, res) {
    Controller.insert(req.body, req.user.id)
        .then((list) => {
            response.sucess(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, `Informacion invalida ${error}`, 400)
        });
}
function update(req, res) {
    Controller.upsert(req.body, req.params.id, req.user.id)
        .then((list) => {
            response.sucess(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, `Informacion invalida ${error}`, 400)
        });
}

module.exports = router 