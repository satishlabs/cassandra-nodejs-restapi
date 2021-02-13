var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1'});

client.connect(function(error,result){
  console.log("Cassandra Connected Successfully...: filers");
});

var getAllFilers = "SELECT * FROM cmsdb.filer_details";

/* GET filers listing. */
router.get('/', function(req, res) {
  client.execute(getAllFilers,[],function(error,result){
    console.log("Result: "+result);
    if(error){
      res.status(404).send({msg:error});
    }else{
    res.json(result);
    }
  });
});

module.exports = router;
