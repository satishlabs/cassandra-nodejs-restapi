var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1'});

client.connect(function(error,result){
  console.log("Cassandra Connected Successfully...: Add Filer");
});

router.get('/',function(req,res){
    res.render('addfiler');
});

var upsertFiler = 'INSERT INTO cmsdb.filer_details(filerid, dataset, hostname, filergroup, type, status, userlocalcapacity, tags) VALUES(?,?,?,?,?,?,?,?)';

router.post('/',function(req,res){
    client.execute(upsertFiler,[
        req.body.filerid,
        req.body.dataset,
        req.body.hostname,
        req.body.filergroup,
        req.body.type,
        req.body.status,
        req.body.userlocalcapacity,
        req.body.tags
    ],function(error,result){
        if(error){
            console.log("Error displying")
            res.status(404).send({msg: error});
        }else{
            console.log("Filer Added ***************");
            res.json(result);
        }
    });
});

module.exports = router;