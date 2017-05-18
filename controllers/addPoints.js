var api_key = 'sk_test_XMNNSykVep2aCyyOCPSuAHgt';  // secret stripe API key
var stripe = require('stripe')(api_key);
var task = require('../models/task');
var validate = require('../validate.js')

module.exports.addpoints = function(req,res){
var Card={
            exp_month: req.body.month,
            exp_year: req.body.year,
            number: req.body.number,
            amount: req.body.amount,
            cvv: req.body.cvv,
            token:req.body.token
        }
validate.validateCard(Card, function(data){
  if(data){
    res.json({
      message: data
    })
  }
	else{  


		stripe.tokens.create({
		  card: {
		    "number": Card.number,
		    "exp_month": Card.exp_month,
		    "exp_year": Card.exp_year,
		    "cvc": Card.cvv
		  }
		}, function(err, token) {
		  console.log(err);
		  console.log(token);
		  if(err){
		  	res.json({
		  		message:'error in transaction'
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
		  }
		  	else
		  	{				
			task.retrievePoints(Card.token,function(data){
				console.log(data);
				task.updatePoints(parseInt(data) + parseInt(Card.amount),Card.token,function(result){
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