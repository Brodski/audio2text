const express = require('express');
const router = express.Router();
// const { render } = require('ejs');
// const { response } = require('express');
const blogController = require("../controllers/blogController");
const Blog = require('../models/blog');
const Transcript = require('../models/transcript');


router.get('/all-blogs', blogController.blog_get_all)
router.get('/blogs/create', blogController.blog_create_get )
router.get('/blogs/:id', blogController.blog_details )
router.get('/blogs', blogController.blog_index)
router.post('/blogs', blogController.blog_create_post)

router.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog! 2',
    snippet: "snippet! 2"
  })
  blog.save().then( (result) => {
    res.send(result)
  })
  .catch( err => {
    console.log("error occured", err)
  })
})


router.get('/id-blog', (req, res) => {
  Blog.findById("62c1341fd54a9c35a948c885").then( result => {
    res.send(result)
  })
})

module.exports = router;