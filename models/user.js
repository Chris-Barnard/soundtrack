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
  }
)

module.exports = mongoose.model('User', UserSchema)