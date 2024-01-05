const express = require('express');
const response = require("../../../network/response");
const Controller = require("./index");
const secure = require("./secure");

const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", secure("upsert"), upsert);
router.delete("/:id", remove);
router.put("/", secure(), update);
router.get("/:id/following", secure('follow'), following);
router.post("/follow/:id", secure('follow'), follow);

function list(req, res, next) {
    Controller.list()
        .then((list) => {
            response.sucess(req, res, list, 200)
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.sucess(req, res, user, 200)
        })
        .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((upsert) => {
            response.sucess(req, res, upsert, 200)
        })
        .catch(next);
}

function remove(req, res, next) {
    Controller.remove(req.params.id)
        .then((removed) => {
            response.sucess(req, res, removed, 200)
        })
        .catch(next);
}

function update(req, res, next) {
    Controller.update(req.body)
        .then((update) => {
            response.sucess(req, res, update, 200)
        })
        .catch(next);
}

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.sucess(req, res, data, 201);
        })
        .catch(next)
}

function following(req, res, next) {
    Controller.get_follows(req.user.id)
    .then(data=>{
        response.sucess(req, res, data, 201);
    })
    .catch(next)
}

module.exports = router;