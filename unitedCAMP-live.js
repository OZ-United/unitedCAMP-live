
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var ltld = require('local-tld-update');

var app = express();

// all environments
app.set('port', process.env.PORT || 0);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
  uploadDir: __dirname + '/public/images/tmp',
  keepExtensions: true
}));
app.use(express.limit('3mb'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./middleware/error')());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * MONGODB CONNECTION
 */

mongoose.connect('mongodb://localhost/united-camp-live');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.once('open', function callback () {
  console.log('Mongo connection opened');
});

/**
 * HTTP SERVER AND ROUTES
 */

var routes = require('./routes');
var users = require('./routes/users');
var messages = require('./routes/messages');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*, X-Requested-With, X-App-Origin, Content-Type, If-Modified-Since, If-None-Match");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD");
  res.header("Access-Control-Expose-Headers", "ETag");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "86400");

  console.log(req.headers);
  if (req.headers["X-App-Origin"]) { 
    req.headers["Origin"] = req.headers["X-App-Origin"];
  }
  console.log(req.headers);
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/', routes.index);

app.get('/users', users.query);
app.post('/users', users.create);
app.post('/users/auth', users.auth);
app.put('/users/:userId', users.update);
app.delete('/users/:userId', users.remove);

app.get('/messages/watch', messages.watch);
app.post('/messages/query', messages.watch);
app.get('/messages', messages.query);
app.post('/messages', messages.create);
app.delete('/messages/:messageId', messages.remove);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + server.address().port);
  ltld.update('united-camp-live', server.address().port);
});
