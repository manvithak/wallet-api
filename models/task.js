var items = require('./users');
var jwt = require('jsonwebtoken');
var items = items.users;
function task(){ };

task.roles = {
  USER: 'user',
  ADMIN: 'admin'
}
task.create = function (params, callback) {
	task.getByPhone(params.phone,function(data){

		if(!data){
			items.create({
                       phone: params.phone,
                       password: params.password,
                       first_name: params.f_name,
                       last_name: params.l_name,
                       dob: params.dob,
                       gender: params.gender,
                       points: 0
                       
                    }).then(function (task) {
                    
                    task.save();
                   
                    console.log(task);
                   });
                }
          callback(data);      
	});	
}
task.login = function(params,callback) {
  task.getByPhone(params.phone, function(data,res,token){
    if(data){
      if(data.dataValues.password == params.password){
        var token = jwt.sign(params, global.config, {
            expiresIn: 1440 // expires in 1 hour
        });
        task.updateToken(params.phone,token);
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

task.getByPhone = function (params, callback){
	items.findOne({where: {phone : params}}).then(function(data){
    //console.log(data);
		callback(data);
	})
}

task.getByToken = function (params, callback){
  items.findOne({where: {token : params}}).then(function(data){
    //console.log(data);
    callback(data);
  })
}

task.updateToken = function(params, token){
  items.update({ token: token },
           { where: { phone: params } })
}

task.retrievePoints = function(params,callback){
  items.findOne({where:{token: params}}).then (function(data){
    callback(data.dataValues.points);
  })
}

task.updatePoints = function(points,token,callback){
  items.update({points: points},
      {where:{token: token}}).then (function(data){
    callback(data);
  });
}

task.updatePointsByPhone = function(points, phone,callback){
  items.update({points: points},
      {where:{phone: phone}}).then(function(result){
        callback(result);

      })
}

module.exports = task;