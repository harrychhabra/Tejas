var mongoose = require('mongoose');
var schema=mongoose.Schema;

var messageSchema=new schema({
  groupname:{
    type: String,
    required : true
  },
  text :{
    type : String,
    required : true
  },
  sender :{
    type : String,
    required : true
  },
},
{
timestamp: true
});

var messageModel=mongoose.model('message',messageSchema);

module.exports=messageModel;
