var app = require('./app/app');

// Set port
app.set('port', process.env.PORT || 8080);

// Listen for requests
app.listen(app.get('port'), () => {
	console.log('Server running at http://127.0.0.1:'+app.get('port')+'/');
});