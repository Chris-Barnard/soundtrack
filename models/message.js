var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema(
  { user : { name : String
           , email : String
           }
  , videoUrl : { type : String, default : null }
  , audioUrl : { type : String, default : null }
  , message : { type : String, default : null }
  , comments : [{ body : String
                , date : Date
                , user : { name : String
                         , email : String
                         }
                , meta : { upvotes : Number
                         , favs : Number
                         }
                }]
  , compressed : { type : Boolean, default : false }
  , audioVideoMixed : { type : Boolean, default : false }
  , dateReceived : { type : Date, default : Date.now }
  }
)

mongoose.model('Message',MessageSchema)