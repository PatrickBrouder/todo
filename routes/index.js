var express = require('express');
var mysql = require('mysql')

var router = express.Router();

var dbConnectionInfo = {
  host : 'eu-cdbr-azure-west-d.cloudapp.net',
  user : 'bea04ce6c423dd',
  password : 'de5ed705',
  database : 'acsm_190c01aa23cbf5d'
};

router.get('/', function(req, res, next) {
  var dbConnection= mysql.createConnection(dbConnectionInfo);
  dbConnection.connect();

  dbConnection.on('error', function(err){
    if(err.code == 'PROTOCOL_SEQUENCE_TIMEOUT'){
      console.log('Got a PROTOCOL_SEQUENCE_TIMEOUT')
    } else {
      console.log('Got a db error ', err);
    }
  });
  
  dbConnection.query('SELECT * FROM todolist', function(err,results,fields){
    if(err){
      throw err;
    }

    var myList =  new Array();

    for(var i=0; i<results.length; i++){
      var item ={}
      item.id= results[i].id;
      item.details= results[i].details;
      myList.push(item);
    }
  
  dbConnection.end();
  res.render('index', { todoList: myList });
  });

});

module.exports = router;
