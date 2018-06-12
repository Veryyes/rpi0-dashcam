/**
 * @author Brandon Wong
 */

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var express = require('express');
var Log = require('./log.js');
var getTimeStamp = Log.getTimeStamp
var app = express();

function getIP(req){ //Some good stack overflow copy pasta
	return ((req.connection.remoteAddress ||
			req.socket.remoteAddress ||
   			req.connection.socket.remoteAddress).split(",")[0]).split(':').pop();
}

//Logs client connection to page
function client_connect(req){
	Log.info(getIP(req) + " connected to " + req.originalUrl);
}

//main page
app.get('/', function(req, res){
	client_connect(req);
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

//md5 hasher
app.get('/md5', function(req, res){
	client_connect(req);
	let input = req.query.input;
	if(input){
		let hash = crypto.createHash('md5').update(input).digest('hex');
		res.send(hash);
	}else{
		res.status(400);
		res.send("try: <br><strong>berrybox/md5?input=%s</strong>");
	}

});

app.get('/*', function(req, res){
	client_connect(req);
	res.status(404);
	res.send("<h1>404 Memes not here</h1>")
	Log.info(getIP(req) + " requested non existent page");
});

//Launch 
var server = app.listen(80, function(){
	let host = "berrybox";
	let port = server.address().port;
	
	//Spaces after the backslashes on the end will end its life :(
	let start_art = "\
	   .-----------------.\n\
	   |   .~~.   .~~.   |\n\
	   |  '. \\ ' ' \/ .   |\n\
	   |   .~ .~~~..~.   |\n\
	   |  : .~.'~'.~. :  |\n\
	   | ~ (   ) (   ) ~ |\n\
	   |( : '~'.~.'~' : )|\n\
	   | ~ .~ (   ) ~. ~ |\n\
	   |  (  : '~' :  )  |\n\
	   |   '~ .~~~. ~'   |\n\
	   |       '~'       |\n\
	   `-----------------'\n";

	start_art += ".==========================================.\n";
	start_art += "| Berry Box Listening @ http://"+ host +":" + port + " |\n";
	start_art += "`=========================================='";
	Log.info("\n" + start_art);
});
