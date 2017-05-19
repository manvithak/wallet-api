var connection = require('./../config');
var Sequelize = require('sequelize');
 
var users = connection.define('users', {
		    phone: Sequelize.TEXT,
		    password: Sequelize.TEXT,
            first_name: Sequelize.TEXT,
            last_name:Sequelize.TEXT,
            dob: Sequelize.DATEONLY,
            gender: Sequelize.TEXT,
            points: Sequelize.INTEGER,
            token: Sequelize.TEXT
            });

        connection.sync();
module.exports = users;