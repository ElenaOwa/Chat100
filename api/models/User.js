/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
	username: 'string',
    password: 'string',
    loggedIn: {
        type: 'boolean',
		defaultsTo: 0,
        required: true
      }
    
  },
  
    beforeCreate: function (values, next) {

    bcrypt.hash(values.password, 8 , function (err, hash) {
      if (err) return next(err);
      values.password = hash;
      next();
    });

  }
};

