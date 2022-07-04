
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()

const blogRoutes = require('./routes/blogRoutes');
const transcriptRoutes = require('./routes/transcriptRoutes');
let x = require("dotenv").config();
console.log("xxxx")
console.log(x)

const dbPass = process.env.DB_PASS;
const dbUser = process.env.DB_USERNAME;
const dbUri = `mongodb+srv://${dbUser}:${dbPass}@transcribedb.lu2tf.mongodb.net/transcriptions?retryWrites=true&w=majority`
mongoose.connect(dbUri)
  .then((result) => {
    app.listen(3000)
  })
  .catch( err => {
    console.log('Error', err)
  })

app.set('view engine', 'ejs')
app.set('views', './views') // this line not needed b/c views is by default
// app.listen(3000)

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
// app.use('/blogs', blogRoutes) // (adds blogs at the start) blog/blogs/create
app.use(blogRoutes)
app.use(transcriptRoutes)

app.get('/', (req, res) => {
  // res.send("<p> home </p>") // auto figures out content-type 
  // res.sendFile('./views/index.html', {root: __dirname });
  res.render('index', {title : 'Cool Title'});
})

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', {root: __dirname });
})

app.get('/api/:id', (req, res) => {

})

//If the other app.get() doesnt hit anything, then it will hit this line. must be at bottom
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', {root: __dirname})
})