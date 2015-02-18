var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema(
  // user who message belongs to
  { user : { name : String
           , email : String
           , userId : ObjectId
           }
  // sharing controls who can see the message
  // publicShare messages can be seen by anyone who follows your account
  // privateShare messages are only visible by a specified list of accounts
  , sharing : { publicShare : { type: Boolean, default : true } 
              , privateShareList : [ { user : { name : String
                                              , email : String
                                              }
                                     } ]
              }
  // videoUrl and audioUrl are options of where to store the source file
  , videoUrl : { type : String, default : null }
  , audioUrl : { type : String, default : null }
  // options to track upload and merging progress 
  , compressed : { type : Boolean, default : false }
  , audioVideoMerged : { type : Boolean, default : false }
  , completedFileUrl : { type : String, default : null }
  // text message caption
  , caption : { type : String, default : null }
  // an array of comments
  , comments : [{ body : String
                , date : Date
                , user : { name : String
                         , email : String
                         }
                , meta : { upvotes : Number
                         , favs : Number
                         }
                }]
  , dateReceived : { type : Date, default : Date.now }
  }
)

mongoose.model('Message',MessageSchema)