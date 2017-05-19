var Joi = require('joi');
var getAge = require('./libs');

function validate(){};

validate.validateUser = function(User,callback){
        var phone = User.phone;
        var f_name = User.f_name;
        var l_name = User.l_name;
        var dob = User.dob;
        var age = getAge(dob);
        
        var schema = {
                  phone: Joi.string().regex(/[0-9]/, phone).length(10).required(),
                  f_name: Joi.string().regex(/^\S+$/, f_name).min(2).required(),
                  l_name: Joi.string().regex(/^\S+$/, l_name).min(2).required(),
                  dob: Joi.date().required()
                };

        if( (Joi.validate(phone, schema.phone)).error ){
            
              callback('phone number should be in numbers of exactly 10 digits');
          
        }
        else if( (Joi.validate(f_name, schema.f_name)).error ){
          
            callback('first name must have atleast 2 chars without spaces');
          
        }
        else if( (Joi.validate(l_name, schema.l_name)).error ){
          
            callback('last name must have 2 characters without spaces');
          
        }else if( (Joi.validate(dob, schema.dob)).error ){

            callback('age should be graeter than 20');

        }else if( age < 20 ){
          
            callback('user age should be greater than 20');
        
        }
        else{
          callback(null);
        }
}

validate.validateCard = function(Card, callback){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        if(Card.exp_month > 12){
          
            callback('Not a valid month');
          
        }else if( Card.exp_year < year ){
          
            callback('Not valid year');
          
        }else if( Card.exp_year == year && Card.exp_month < month + 1){
          
            callback('enter valid month and year');

        }else{
            callback(null);
          }
} 

module.exports = validate;