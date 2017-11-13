
module.exports = function (req, res, ok){
	 if(req.session.user){
		 req.body.username = req.session.user.username;
		 ok();
	 } else {
		 res.send('Must be logged in');
	 }
};