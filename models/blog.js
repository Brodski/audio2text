const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: String,
}, {timestamps: true} 
)

const Blog = mongoose.model('Blog', blogSchema) // looks for "Blog" whe
module.exports = Blog;