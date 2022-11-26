//blog_index blog_details, blog_create_get, blog_create

const Blog = require('../models/TRASH_blog');
const Transcript = require('../models/transcript');

const blog_index = (req, res) => {
  Blog.find().sort( {createdAt: -1}).then( result =>  {
    res.render('blogs/blogs', {blogs: result} )
  })
}

const blog_details = (req, res) => {
  const id = req.params.id
  Blog.findById(id).then( result => {
    res.render('blogs/details', {blog: result})
  })
  .catch(err => {
    res.status(404).redirect('/404.html')
  })
}

const blog_create_get = (req, res) => {
  res.render('blogs/create')
}

const blog_create_post =  (req, res) => {
  const blog = new Blog(req.body)
  blog.save().then((result) => {
    res.redirect('/blogs')
  })
}

const blog_get_all = (req, res) => {
  Blog.find().then( result => {
    res.send(result)
  })
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_get_all,
}