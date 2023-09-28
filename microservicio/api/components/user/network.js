const express = require('express');
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", upsert);
router.delete("/:id", remove);

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
    .then((updated)=>{
        response.sucess(req,res, updated, 200)
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


module.exports = router;