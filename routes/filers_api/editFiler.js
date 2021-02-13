var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1'});

client.connect(function(error,result){
  console.log("Cassandra Connected Successfully...: Edit Filer");
});

var getFilerById = 'SELECT * FROM cmsdb.filer_details WHERE filerid = ?';

router.get('/:filerid',function(req,res){
    client.execute(getFilerById,[req.params.filerid],function(error,result){
        if(error){
            res.status(404).send({msg: error});
        }else{
            res.render('editfiler',{
                filerid: result.rows[0].filerid,
                dataset: result.rows[0].dataset,
                hostname: result.rows[0].hostname,
                filergroup: result.rows[0].filergroup,
                type: result.rows[0].type,
                status: result.rows[0].status,
                userlocalcapacity: result.rows[0].userlocalcapacity,
                tags: result.rows[0].tags
            });
        }
    });
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
            console.log("Filer Updated ***************");
            res.redirect('/filer/'+req.body.filerid);
        }
    });
});

module.exports = router;