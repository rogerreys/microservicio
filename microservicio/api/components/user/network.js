const express = require('express');
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.delete("/:id", remove);
router.put("/", update);

function list (req, res){
    Controller.list()
    .then((list)=>{
        response.sucess(req,res, list, 200)
    })
    .catch((error)=>{
        response.error(req,res,error.message, 500)
    });
}

function get(req, res){
    Controller.get(req.params.id)
    .then((user)=>{
        response.sucess(req,res, user, 200)
    })
    .catch((err)=>{
        response.error(req,res,err,500)
    });    
}

function upsert (req, res){
    Controller.upsert(req.body)
    .then((upsert)=>{
        response.sucess(req,res, upsert, 200)
    })
    .catch((err)=>{
        response.error(req,res,err,500)
    });    
}

function remove(req, res){
    Controller.remove(req.params.id)
    .then((removed)=>{
        response.sucess(req,res, removed, 200)
    })
    .catch((err)=>{
        response.error(req,res,err,500)
    });    
}

function update(req, res){
    Controller.update(req.body)
    .then((update)=>{
        response.sucess(req,res,update,200)
    })
    .catch((err)=>{
        response.error(req,res, err, 500)
    });
}

module.exports = router;