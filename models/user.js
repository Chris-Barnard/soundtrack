var mongoose = require('mongoose')

var UserSchema = mongoose.Schema(
  { username : String
  ,	email : String
  , name : { first : String
  		     , last : String
           }
  , role : { type : String, default : "user" }
  , salt : String
  , hash : String
  , follows : Array
  , followers : [{ type: mongoose.Schema.Types.ObjectId, ref : 'User' }]
  }
)

module.exports = mongoose.model('User', UserSchema)