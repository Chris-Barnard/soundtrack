var mongoose = require('mongoose')

var UserSchema = mongoose.Schema(
  { email : String
  , name : String
  , password : String
  , token : String 
  }
)

module.exports = mongoose.model('User', UserSchema)