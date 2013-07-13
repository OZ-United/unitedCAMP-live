
/*
 * messages
 */

var MessageModel = require('../models/Message.js');
var error = require('../lib/error');
var events = require('events');
var eventEmitter = new events.EventEmitter();

exports.query = function(req, res, next){
  console.log(req.headers);
  var from = req.query.from || new Date().toISOString();
  var LIMIT = 50;
  MessageModel.find({'date': { $lt: from }})
  .populate('author', 'email name gravatar userId')
  .sort({'date': -1}).limit(LIMIT)
  .exec(function(err, messages){
    if (err) { return next(error); }
    res.json(messages);
  });
};

exports.create = function(req, res, next){
  var message = {};
  message.text = req.body.text;
  message.image = req.body.image;
  message.author = req.body.author;

  new MessageModel(message).save(function(err, message){
    if (err) {
      return next(err);
    }

    message.populate({'path': 'author', 'select': 'email name gravatar userId'}, function(err, message){
      if (err) {
        return next(err);
      }

      eventEmitter.emit('newmsg', message);
      console.log(message);
      res.json(message);
    });

  });
};

exports.remove = function(req, res, next){
  MessageModel.findById(req.params.messageId, function(err, message){
    if (err) { return next(error); }
    if (! message) { return next(new error.NotFound('Message does not exist.')); }

    message.remove(function(err, message){
      if (err) return next(err);
      res.send(204);
    });
  });
};

exports.watch = function(req, res, next){
  if (!(req.headers.accept && req.headers.accept == 'text/event-stream')) {
    return next(new error.NotAcceptable('Use SSE request.'));
  }

  var id = (new Date()).toLocaleTimeString();

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.socket.on('close', function () {
    console.log('SSE: close ' + id);
    if (interval) {
      clearInterval(interval);
    }
    res.end();
  });

  var interval = setInterval(function(){
    constructSSE(res, id, '', false, true);
  }, 60000);

  eventEmitter.on('newmsg', function(msg){
    constructSSE(res, id, JSON.stringify(msg));
  });

};

var constructSSE = function(res, id, data, close, loop) {
  if (data.length) {
    res.write('id: ' + id + '\n');
    res.write('data: ' + data + '\n\n');
    console.log('SSE: write ' + id);
  }

  if (close) {
    res.write('id: ' + id + '\n');
    res.write('event: ' + 'close' + '\n\n');
    console.log('SSE: res end ' + id);
    res.end();
  }
  else if (loop) {
    res.write('id: ' + id + '\n');
    res.write('event: ' + 'loop' + '\n\n');
    console.log('SSE: loop ' + id);
  }
};