var task = require('../models/task');
var validate = require('../validate.js');

function create (req, res) {
  var User={
            phone: req.body.phone,
            password: req.body.password,
            f_name: req.body.first_name,
            l_name: req.body.last_name,
            dob: req.body.dob,
            gender: req.body.gender,
            
          }
  validate.validateUser(User, function(data){
  if(data){
    res.json({
      message: data
    })
  }else{
  task.create(User, function (data) {
      if(!data){
        res.json({
          message:'user register successfully'
        })
      }else{
        res.json({
          message: 'user already exists'
        })
      }   
  });
 }
 }) 
}

function login (req, res) {
  var User = {
    phone: req.body.phone,
    password: req.body.password
  }
  task.login(User,function(data,err,token){
    if(data){
      if(err){
          res.json({
            message:err
          })

      }else{
      res.json({
        message:'login successful',
        token: token
      })
    }
    }else{
      res.json({
        message:'user not found'
      })
    }
  });
}


module.exports = {
  create: create,
  login: login
};
