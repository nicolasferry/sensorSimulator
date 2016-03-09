var config = require('./config.json');
var fs = require('fs');  // file system
var http = require('http');
var server = http.createServer(function (req, res) {
  // logic here to determine what file, etc
  setInterval( function(){
	  var rstream = fs.createReadStream(config.file);
	  //rstream.pipe(res);
	  rstream.on('data', function(chunk) {
		    res.write(chunk);
		});

		rstream.on('end', function() {

		});
  }, config.frequency)
});
server.listen(8000, config.ip);  // start
