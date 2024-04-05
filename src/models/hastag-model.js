let mongoose = require('mongoose');
const {Schema}  = mongoose
const {Tweet} = require('./tweet-models')
const HashtagSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
   tweets:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:Tweet
    },
   ]
    
},{
    versionKey:false
})
const Hashtag = mongoose.model('Hashtag', HashtagSchema);
module.exports = 
    Hashtag
