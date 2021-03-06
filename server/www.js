require('dotenv').config()

var app = require('../app');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
var server = http.createServer(app);
var listener = server.listen(port, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

server.on('error', onError);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) 
        return val;

    if (port >= 0) 
        return port;

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}
