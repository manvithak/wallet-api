var User= require('../models/users');
var validate = require('../validate.js');

function create (req, res) {
  var user={
    phone: req.body.phone,
    password: req.body.password,
    email: req.body.email
  }
  validate.validateUser(user, function(data){
  if(data){
    res.json({
      message: data
    })
  }else{
    User.create(user, function (data) {
        if(!data){
          res.json({
            message:'user register successfully',
          })
        }
        else{
          res.json({
            message: 'user already exists'
          })
        }

    });
   }
  }) 
}

function login (req, res) {
  var user = {
    phone: req.body.phone,
    password: req.body.password,
    email:req.body.email
  }
  User.login(user,function(data,err,token){
    console.log(data.dataValues.points);
    if(data){
      if(err){
          res.json({
            message:err
          })

      }else{
      res.json({
        message:'login successful',
        token: token,
        balance:data.dataValues.points
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
