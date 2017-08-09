var secret = require('../secret');
var api_key = process.env.api_key;  // secret stripe API key
var stripe = require('stripe')(api_key);
var User = require('../models/users');
var validate = require('../validate.js');

module.exports.addpoints = function(req,res){
var Card={
	expMonth:req.body.month,
	expYear:req.body.year,
	number:req.body.number,
	amount:req.body.amount,
	cvv:req.body.cvv,
	token:req.body.token
	}
validate.validateCard(Card, function(data){

  if(data){
    res.json({
      message: data
    })
   
  }else{ 
  			stripe.tokens.create({
		    card: {
		    "number": Card.number,
		    "exp_month": Card.expMonth,
		    "exp_year": Card.expYear,
		    "cvc": Card.cvv
		  }
		 }, function(err, token) {
		  console.log(err);
		  console.log(token);
		  if(err){
		  	res.json({
		  		message:'error in transaction, enter valid details'
		  	})
		  }
		  stripe.charges.create({
		  amount: Card.amount,
		  currency: "usd",
		  source: token.id 
		  
		},function(err, charge) {
		  console.log(err);
		  console.log(charge);
		  if(err){
		  	res.json({
		  		message: 'error in transaction'
		  	})
		  }else
		  {				
			User.retrievePoints(Card.token,function(data){
				console.log(data);
				User.updatePoints(parseInt(data) + parseInt(Card.amount),Card.token,function(result){
					if(result){
						res.json({
							message:'points added to wallet'
						})
					}else{
						res.json({
							message:'error in adding points'
						})
					}
				});

			});
		  }
		  });


		});
	
}
});
}