const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transcriptSchema = new Schema({ 
  any: Object 
},  { 
  strict: false, 
  id: false   // _id and id will exist. _id=auto. id=custom (you make)
});

const transcriptParaSchema = new Schema({ 
  any: Object 
},  { 
  strict: false, 
  id: false   // _id and id will exist. _id=auto. id=custom (you make)
});

const Transcript = mongoose.model('Transcript', transcriptSchema) 
const TranscriptParagraphs = mongoose.model('TranscriptParagraphs', transcriptParaSchema) 
module.exports = { Transcript, TranscriptParagraphs };
// module.exports = TranscriptParagraphs;