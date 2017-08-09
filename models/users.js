var connection = require('./../config');
var Sequelize = require('sequelize');
var jwt = require('jsonwebtoken');
 
var users = connection.define('users', {
  phone: Sequelize.TEXT,
  password: Sequelize.TEXT,
  email:Sequelize.TEXT,
  points: Sequelize.INTEGER,
  token: Sequelize.TEXT
  });

connection.sync();

function User(){ };

User.create = function (params, callback) {
	User.getByPhone(params.phone,function(data){

		if(!data){
			users.create({
       phone: params.phone,
       password: params.password,
       email:params.email,
       points: 0
      }).then(function (task) {
        
        task.save();
       
        console.log(task);
       });
    }
    callback(data);      
	});	
}

User.login = function(params,callback) {
  if(!params.phone){
    
  }
  User.getByPhone(params.phone, function(data,res,token){
    if(data){
      if(data.dataValues.password == params.password){
        console.log(process.env.jwt_secret);
        var token = jwt.sign(params, process.env.jwt_secret, {
            expiresIn: 1440 // expires in 1 hour
        });
        User.updateToken(params.phone,token);
          callback(data,res,token);

      }else{
          res = 'invalid password';
          callback(data,res);
      }
    }else{
      callback(data,res);
    }
  })
}

User.getByPhone = function (params, callback){
	users.findOne({where: {phone : params}}).then(function(data){
    //console.log(data);
		callback(data);
	})
}

User.getByToken = function (params, callback){
  users.findOne({where: {token : params}}).then(function(data){
    //console.log(data);
    callback(data);
  })
}

User.updateToken = function(params, token){
  users.update({ token: token },
           { where: { phone: params } })
}

User.retrievePoints = function(params,callback){
  users.findOne({where:{token: params}}).then (function(data){
    console.log(data);
    callback(data.dataValues.points);
  })
}

User.updatePoints = function(points,token,callback){
  users.update({points: points},
      {where:{token: token}}).then (function(data){
    callback(data);
  });
}

User.updatePointsByPhone = function(points, phone,callback){
  users.update({points: points},
      {where:{phone: phone}}).then(function(result){
        callback(result);

      })
}
module.exports = User;