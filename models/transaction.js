var connection = require('./../config');
var Sequelize = require('sequelize');
var User = require('../models/users'); 
var transaction = connection.define('transactions', {
				    sentby: Sequelize.TEXT,
				    receivedby: Sequelize.TEXT,
            amount: Sequelize.INTEGER,
            });

connection.sync();

function transactionAction() {};

transactionAction.updateLog = function(phone, params){
	transaction.create({
   sentby: phone,
   receivedby: params.phone,
   amount: params.amount,
   }).then(function (task) {
    task.save();
    console.log(task);
   });
}

transactionAction.userTransItems=function(params,callback){
  transaction.findAll({where: {$or: [{sentby: params}, {receivedby: params}]}}).then(function(data){
    //console.log(data);
    callback(data);
  })
}



module.exports = transactionAction;
