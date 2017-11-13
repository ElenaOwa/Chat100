/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	
	main:function(req, res){
		if(req.session.user){
			Message.subscribe(req.socket);
			res.view('index',{
				user: req.session.user,
				error: false
		});
	} else{
		res.view('index',{
			user: false,
			error: false
		});
	}
	},
	
	login: function(req,res){
		var username = req.body.username;
		var password = req.body.password;
		
	User.findOneByUsername(username,function(err, user){
		if(user){
			bcrypt.compare(password,user.password, function(err,match) {
				if (match){
					req.session.user = user;
					res.view('index',{
						user: user
					});
				}
			});
		}
	});
  },
  logout: function (req, res){
	  req.session.user = null;
	  res.view('index',{
		  user: false,
		  error: false
      });
  }
};

