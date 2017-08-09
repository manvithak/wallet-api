var User = require('../models/users');
var transactionAction = require('../models/transaction')
module.exports.transfer = function(req, res){
	var transfer = {
		token: req.body.token,
		phone: req.body.phone,
		amount: req.body.amount
	}
User.getByToken(transfer.token,function(data){
		
	if( data != null ){
		if(data.dataValues.points >= transfer.amount){
			User.getByPhone(transfer.phone,function(result){
				if( result != null ){
					User.updatePointsByPhone( parseInt(result.dataValues.points) + parseInt(transfer.amount),
					 transfer.phone,function(result){
							res.json({
								message:'transfer success'
							})
							transactionAction.updateLog(data.dataValues.phone,transfer);
						});
					}
				else{
					res.json({
						message:'person not registered'
					})
				}
			});
			User.updatePoints(data.dataValues.points - parseInt(transfer.amount),
			 transfer.token,function(data){
			 	if(!data){
				res.json({
					message:'error in updation'
				})
				}
			});	
		}else{
			res.json({
				message:'no sufficient amount in users wallet'
			})
		}
	}else{
		res.json({
			message:'error in token'
		})
	}
});
}
