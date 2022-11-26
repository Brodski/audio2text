const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const captionsSchema = new Schema({
  any: Object 
  },  { 
  strict: false
  // _id: {auto: true}
});

const VodSchema = new Schema([{
  "CsvPath": String,
  "vidPath": String,
  "vidTitle": String,
  "Clips": [{type: Schema.Types.ObjectId, ref: "Clips"}]
  },  { 
  strict: false
}]);


const ClipSchema = new Schema([{
  "Start Time": String,
  "End Time": String,
  "Transcript": String,
  "Vod": {type: Schema.Types.ObjectId, ref: "Vod"}
  },  { 
  strict: false
}]);
VodSchema.set('timestamps', true)
const Captions = mongoose.model('Captions', captionsSchema);
const Vod = mongoose.model('Vod', VodSchema);
const Clip = mongoose.model('Clip', ClipSchema);
module.exports = { Captions, Vod, Clip };