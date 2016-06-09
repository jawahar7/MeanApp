var express = require('express');
var route = require('./server/route/route');
var app = express();

//Middleware
app.use(route);
app.use(express.static(__dirname + '/client/build'));

app.listen('3000', function(err){
	if(err)
		console.log(err);
	else
		console.log('listening...');
});