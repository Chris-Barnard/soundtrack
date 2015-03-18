var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema(
  // user who message belongs to
  { sender : { id : { type: mongoose.Schema.ObjectId, index : true }
             , username : String
             , iconPath : String
             }
  // sharing controls who can see the message
  // publicShare messages can be seen by anyone who follows your account
  // privateShare messages are only visible by a specified list of accounts
  , sharing : { publicFlag : { type: Boolean, default : true } 
              , privateList : Array
              }
  , body : { mediaUrl : { type : String, default : null }
           // text message caption
           , caption : { type : String, default : null }
           }
  // an array of comments
  , comments : Array
  , dateReceived : { type : Date, default : Date.now }
  /*
  // options to track upload and merging progress 
  , compressed : { type : Boolean, default : false }
  , audioVideoMerged : { type : Boolean, default : false }
  // videoUrl and audioUrl are options of where to store the source file
  , videoUrl : { type : String, default : null }
  , audioUrl : { type : String, default : null }*/
  }
)

mongoose.model('Message',MessageSchema)