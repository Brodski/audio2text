// https://stackoverflow.com/questions/46857335/how-to-remove-stage-from-urls-for-aws-lambda-functions-serverless-framework


// https://www.hava.io/blog/what-is-aws-elastic-beanstalk
// After deployment, the operations of your Elastic Beanstalk hosted applications is also easier. You no longer have to take on the role of monitoring servers, monitoring storage, managing network loads, keeping operating systems up to date since this is all taken care of by the platform.
console.log("0 greetingssssssssssssssssssssss")
const { default: mongoose } = require('mongoose');
const express = require('express');
const app = express()

console.log(".3 greetingssssssssssssssssssssss")
const myCron = require('./jobs/jobs'); // This calls cron

console.log(".4 greetingssssssssssssssssssssss")
const transcriptRoutes = require('./routes/transcriptRoutes');

console.log("1 greetingssssssssssssssssssssss")

const serverless = require('serverless-http');
const path = require("path");

require("dotenv").config();

console.log("2 greetingssssssssssssssssssssss")

const dbPass = process.env.DB_PASS;
const dbUser = process.env.DB_USERNAME;
let dbUri = '';
console.log("3 greetingssssssssssssssssssssss")
// sloppy, should update at some point. (have to update env-variables in Beanstalk)
if (process.env.SAMPLE_DB_NAME != null ){
  console.log("Connecting to sample DB")
  dbUri = `mongodb+srv://${dbUser}:${dbPass}@transcribedb.lu2tf.mongodb.net/${process.env.SAMPLE_DB_NAME}?retryWrites=true&w=majority`
} else {
  dbUri = `mongodb+srv://${dbUser}:${dbPass}@transcribedb.lu2tf.mongodb.net/transcriptions?retryWrites=true&w=majority`
}

console.log('gonna connect to mongo!')
console.log('PORT!')
console.log(process.env.PORT || 3000)
console.log(process.env.PORT || 3000)
console.log(process.env.PORT || 3000)
console.log(process.env.PORT || 3000)
console.log("serveless env: SUB_ENV " + process.env.SUB_ENV)
console.log("serveless env: COOL_API_TEST " + process.env.COOL_API_TEST)
mongoose.connect(dbUri)
  .then((result) => {
    console.log("Connected to mongoose DB, gogoogogoo");
    var admin = new mongoose.mongo.Admin(mongoose.connection.db);
    admin.buildInfo(function (err, info) {
       console.log("Mongodb version: ", info.version);
    });
    // PORT 443 for cloud / beanstalk and such.
    if (!process.env.IS_LAMBDA) {
      app.listen( process.env.PORT || 3000 ) 
    }
  })
  .catch( err => {
    console.log('Error', err)
  })
  

app.set('view engine', 'ejs')
app.set('views', './views') // this line not needed b/c views is by default

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(transcriptRoutes)
// app.use('/.netlify/functions/app', transcriptRoutes)



app.get('/', async (req, res) => {
  console.log("transcripts route")
  res.render('./transcripts/search', {title : 'Search'});
})

app.get('/test', async (req, res) => {
  console.log("test page :)")
  // res.send("<p> home </p>") // auto figures out content-type 
  // res.sendFile('./views/index.html', {root: __dirname });
  res.render('test', {title : 'Cool Title :)'});

})
// npm i serverless-http
// npm i netlify-lambda
// If the other app.get() doesnt hit anything, then it will hit this line. must be at bottom
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', {root: __dirname})
})

// Credentials are stored in INI format in ~/.aws/credentials
// C:\Users\DrBrodski\.aws
console.log("process.env.IS_LAMBDA" , process.env.IS_LAMBDA)
if (process.env.IS_LAMBDA) {
  console.log("process.env.IS_LAMBDA" , process.env.IS_LAMBDA)
  module.exports.handler = serverless(app);
}