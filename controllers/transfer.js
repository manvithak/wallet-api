var task = require('../models/task');
var transaction = require('../models/transaction_actions')
module.exports.transfer = function(req, res){
	var transfer = {
		token: req.body.token,
		phone: req.body.phone,
		amount: req.body.amount
	}
	task.getByToken(transfer.token,function(data){
		
		if( data != null ){
			if(data.dataValues.points >= transfer.amount){
				task.getByPhone(transfer.phone,function(result){
					if( result != null ){
						task.updatePointsByPhone( parseInt(result.dataValues.points) + parseInt(transfer.amount),
						 transfer.phone,function(result){
								res.json({
									message:'transfer success'
								})
								//transaction.updateLog(data.dataValues.phone,transfer);
							});
						}
					else{
						res.json({
							message:'person not registered'
						})
					}
				});
    			task.updatePoints(data.dataValues.points - parseInt(transfer.amount),
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
