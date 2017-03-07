var express = require('express');
var mysql = require('mysql')

var router = express.Router();

var dbConnectionInfo = {
  host : 'eu-cdbr-azure-west-d.cloudapp.net',
  user : 'bea04ce6c423dd',
  password : 'de5ed705',
  database : 'acsm_190c01aa23cbf5d'
};

router.get('/create', function(req, res, next){
    res.render('createTodo');
});

router.post('/newItem', function(req, res, next){
    var dbConnection= mysql.createConnection(dbConnectionInfo);
  dbConnection.connect();

  dbConnection.on('error', function(err){
    if(err.code == 'PROTOCOL_SEQUENCE_TIMEOUT'){
      console.log('Got a PROTOCOL_SEQUENCE_TIMEOUT')
    } else {
      console.log('Got a db error ', err);
    }
  });

  var listItem={}
  listItem.text= req.body.item;
  dbConnection.query('INSERT INTO todolist(details) VALUES(?,?)',[listItem.text], function(err,results,fields){

      if(err){
          throw err;
      }
      listItem.id = results.insertId;
      dbConnection.end();
      res.redirect('/');
  });


});