var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var MessageModelSchema = new Schema({
  text: { type: String, required: true, trim: true},
  image: { type: String },
  date: { type: Date, default: Date.now, index: true },
  author: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true }
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

MessageModelSchema.virtual("messageId").get(function(){
  return this.id;
});


module.exports = mongoose.model('MessageModel', MessageModelSchema);