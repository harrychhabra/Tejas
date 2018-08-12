var mongoose = require('mongoose');
var schema=mongoose.Schema;

var personalmessageSchema=new schema({
  chatname:{
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

var personalmessageModel=mongoose.model('personalMessage',personalmessageSchema);

module.exports=personalmessageModel;
