var http = require('http');
var config = require('./config.json');
var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');


var lineNr = 0;
var currentL = 0;

function provideContent(res, nr){

var s= fs.createReadStream(config.file)
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

	if(currentL >= lineNr){
        // pause the readstream
        s.pause();

        // process line here and call s.resume() when rdy
        lineNr++;
	console.log(lineNr);
        res.write(line+"\n");

        setTimeout(function(){
                s.resume();
        }, config.frequency);
	}
	currentL++;
    })

    .on('error', function(){
        console.log('Error while reading file.');
    })

    .on('end', function(){
        console.log('Read entire file.')
	process.exit();
    })
);
}

var server = http.createServer(function (req, res) {
	provideContent(res);
});

server.listen(8000);  // start
