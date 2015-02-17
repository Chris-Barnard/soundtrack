var mongoose = require('mongoose')

var UserSchema = mongoose.Schema(
  { username : String
  ,	email : String
  , name : { first : String
  			   , last : String
           }
  , salt : String
  , hash : String
  , role : String
  }
)

module.exports = mongoose.model('User', UserSchema)