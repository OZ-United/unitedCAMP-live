
/*
 * messages
 */

var MessageModel = require('../models/Message.js');
var error = require('../lib/error');


exports.query = function(req, res, next){
  var from = req.query.from || 0;
  MessageModel.find({})
  .populate('author', 'email name')
  .sort('date', 1).skip(from).limit(10)
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
    console.log(message);
    res.json(message);
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
