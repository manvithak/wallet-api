var Joi = require('joi');
var getAge = require('./libs');

function validate(){};

validate.validateUser = function(User,callback){
  var phone = User.phone;
  var email = User.email;
  var password = User.password;
  
  var schema = {
    phone: Joi.string().regex(/[0-9]/, phone).length(10).required(),
    password: Joi.string().min(8).required(),
    email:Joi.required()
  };

  Joi.validate(User, schema, function (err, value) {
      
    if (err) {
      callback(err.details);
    }else{
      callback(null);
    }
    
  }); 

}

validate.validateCard = function(Card, callback){
  var d = new Date();
  var year = d.getFullYear();
  var expMonth =Card.expMonth;
  var expYear = Card.expYear;
  var cvv = Card.cvv;
  var amount =  Card.amount;
  var number =  Card.number;
  var token =  Card.token;
  var schema = {
    expMonth: Joi.number().min(1).max(12).required(),
    expYear: Joi.number().min(year).required(),
    cvv: Joi.number().required(),
    amount: Joi.number().required().min(0),
    number: Joi.number().required(),
    token: Joi.string().required()
  };

  Joi.validate(Card, schema, function (err, value) {
      
    if (err) {
      callback(err.details);
    }else{
      callback(null);
    }
    
  }); 
} 

module.exports = validate;