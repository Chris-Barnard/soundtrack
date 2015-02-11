var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema(
  { user : { name : String
           , email : String
           }
  , videoPath : { type : String, default : null }
  , audioPath : { type : String, default : null }
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