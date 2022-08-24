const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const captionsSchema = new Schema(
//   [{
//   "Start Time": String,
//   "End Time": String,
//   "Transcript": String,
// } ]
// )


const captionsSchema = new Schema({
  any: Object 
  },  { 
  strict: false
  // _id: {auto: true}
});



const captionsSchema2 = new Schema([{
  "Start Time": String,
  "End Time": String,
  "Transcript": String,
  },  { 
  strict: false
}]);

const Captions = mongoose.model('Captions', captionsSchema);
const Captions2 = mongoose.model('Captions2', captionsSchema2);
module.exports = { Captions, Captions2 };