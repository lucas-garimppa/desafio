var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var upload = require('express-fileupload');
var session = require('express-session');
var cors = require('cors');
var path = require('path');
var views = require('./server/routes_views');
var webservices = require('./server/routes_webservices');
// const { handleServiceError } = require('./server/exceptions/appHandleError');

var app = express();

process.env.TZ = 'America/Sao_Paulo';
console.log(process.env.TZ);
console.log(new Date().toLocaleTimeString());

if (!process.env['NO-LOGGER']) app.use(logger('dev'));

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(cors());
app.use(session({ secret: 'senha123', rolling: true, cookie: { maxAge: 1000 * 60 * 40 } }));
app.use(upload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(requireHTTPS);
app.use('/', views);
app.use('/ws/', webservices);
app.use(handleNotFound());
// app.use(handleServiceError());
app.use(handleError());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;

function handleError() {
    return function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    };
}

function handleNotFound() {
    return function (req, res, next) {
        console.log('*** 404 Not Found: ' + req.method + ' ' + req.originalUrl);
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    };
}

// set up a route to redirect http to https
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (
        !req.secure &&
        req.get('x-forwarded-proto') !== 'https' &&
        (process.env.REACT_APP_AMBIENTE === 'homologacao' ||
            process.env.REACT_APP_AMBIENTE === 'producao')
    )
        return res.redirect('https://' + req.get('host') + req.url);

    next();
}
