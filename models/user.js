var mongoose = require('mongoose')

var UserSchema = mongoose.Schema(
  { username : String
  ,	email : String
  , name : { first : String
  			   , last : String
           }
  , password : String
  , role : String
  }
)

module.exports = mongoose.model('User', UserSchema)