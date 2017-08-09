var userTransaction = require('../models/transaction');
var User = require('../models/users');

module.exports.transaction = function(req,res){
	var transaction = {
		phone:req.body.phone,
		token:req.body.token
	}
	User.getByToken(transaction.token,function(data){
		if(data != null){
			userTransaction.userTransItems(transaction.phone,function(data){
			if(data){
				res.json({
					message:data
				})
			}else
			{
				res.json({
					message:'there are no transactions yet'
				})
			}
			})
		}else{
			res.json({
				message:'authentication error'
			})
		}
	})
	
}