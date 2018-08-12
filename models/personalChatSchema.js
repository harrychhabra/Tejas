var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  user_id: {
    type: String,
    default: ''
  },
  name: {
  type: String,
  default: ''
}
});

var personalChatSchema = new Schema ({
  user1: [userSchema],
  user2: [userSchema]
}, {
    timestamp: true
});


module.exports = mongoose.model('personalChat', personalChatSchema);
