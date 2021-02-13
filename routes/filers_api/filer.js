var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1'});

client.connect(function(error,result){
  console.log("Cassandra Connected Successfully...: FindById");
});

var getFilerById ='SELECT * FROM cmsdb.filer_details WHERE filerid =?';

router.get('/:filerid',function(req,res){
    client.execute(getFilerById,[req.params.filerid],function(error,result){
        if(error){
            res.status(404).send({msg:error});
        }else{
            res.json(result);
            console.log("Result: "+result);
        }
    });
});
//delete from filer_Details by filerId
var deleteFiler = 'DELETE FROM cmsdb.filer_details WHERE filerid = ?';
router.delete('/:filerid',function(req,res){
    client.execute(deleteFiler,[req.params.filerid], function(error,result){
        if(error){
            res.status(404).send({msg:error});
        }else{
            res.json(result);
        }
    });
});

module.exports = router;