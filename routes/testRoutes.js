const express = require('express');
const https = require('https');
const router = express.Router();
const { Transcript } = require('../models/transcript');
const { TranscriptParagraphs } = require('../models/transcript');
const { Captions } = require('../models/captions');
const { Captions2 } = require('../models/captions');
require("dotenv").config();
const parseString = require('xml2js').parseString;
const common = require('../controllers/common.js');
const csv = require("csvtojson");



// 
// 
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/regexMatch/
// 
// 

    
    
router.get("/test/csvFind", async (req, res) => {
    console.log("got this req.query", req.query);
    console.log("got this req.params", req.params);

    let querySearch = common.processQuery(req.query.search);
    // processQuery("big nasty string");
    console.log("QUERY SEARCH FINAL =", querySearch);
    let resultzz = await Captions.aggregate([
        {
          $project: {
            highmarks: {
              $filter: {
                input: "$captions",
                as: "thecaps",
                cond: {
                  "$regexMatch": {
                    "input": "$$thecaps.Transcript",
                    "regex": "trump|New York",
                    "options": "i"
                  }
                }                
              }
            }
          }
        }        
    ]).then ( rez => { 
        return rez;
    })
    console.log("resultzz")
    console.log("resultzz")
    console.log("resultzz")
    console.log("resultzz")
    // console.debug("%o",resultzz)
    console.log("****")
    res.body = resultzz;
    res.send(resultzz)
    // res.render("./transcripts/blank")

})


    
router.get("/test/csv", async (req, res) => {
    let csvUrl = process.env.CDN_DOMAIN + "/vids/maherTest/maherecsv.csv";
    // let response = await common.makeHttpRequest(csvUrl, process.env.ASSEMBLYAI_API_KEY , true)
    let response = await common.makeHttpRequest(csvUrl)
    console.log(response)
    console.log(response.statusCode)
    console.log(response.data)
    console.log('CSV')
    console.log('CSV')
    console.log('CSV')
    console.log('CSV')
    console.log('CSV')
    console.log('CSV') 
    // csv({output:"line"})
    let captions = await csv()
    .fromString(response.data)
    .subscribe((csvObj)=>{ 
        csvObj.Transcript = csvObj.Transcript?.replace("\r", " ");
        csvObj.fukboy = "in your head rent free";
    })
    console.log("---------------")
    console.log("---------------")
    console.log(captions)
    console.log("DONE!")
    // const captions = new Captions(x);
    const captionsMongoose = new Captions({
        captions,
        age: "69"
    });
    captionsMongoose.save().then( (result) => {
        console.log("save success!.")
    })
    .catch( err => {
        console.log("(My error csv) Error occured", err)
    })
    console.log(captionsMongoose)
    res.json({captions} )
    // res.render('transcripts/blank')
}) 




router.get('/test-transcript', (req, res) => {

    // const transcript = new Transcript( {
    //   "gender": "male",
    //   "name": {
    //     "title": "mr",
    //     "first": "brad",
    //     "last": "gibson"
    //   },
    //   "location": {
    //     "street": "9278 new road",
    //     "city": "kilcoole",
    //     "state": "waterford",
    //     "postcode": "93027",
    //     "coordinates": {
    //       "latitude": "20.9267",
    //       "longitude": "-7.9310"
    //     },
    //     "timezone": {
    //       "offset": "-3:30",
    //       "description": "Newfoundland"
    //     }
    //   },
    //   "email": "brad.gibson@example.com",
    //   "login": {
    //     "uuid": "155e77ee-ba6d-486f-95ce-0e0c0fb4b919",
    //     "username": "silverswan131",
    //     "password": "firewall",
    //     "salt": "TQA1Gz7x",
    //     "md5": "dc523cb313b63dfe5be2140b0c05b3bc",
    //     "sha1": "7a4aa07d1bedcc6bcf4b7f8856643492c191540d",
    //     "sha256": "74364e96174afa7d17ee52dd2c9c7a4651fe1254f471a78bda0190135dcd3480"
    //   },
    //   "dob": {
    //     "date": "1993-07-20T09:44:18.674Z",
    //     "age": 26
    //   },
    //   "registered": {
    //     "date": "2002-05-21T10:59:49.966Z",
    //     "age": 17
    //   },
    //   "phone": "011-962-7516",
    //   "cell": "081-454-0666",
    //   "id": {
    //     "name": "PPS",
    //     "value": "0390511T"
    //   },
    //   "picture": {
    //     "large": "https://randomuser.me/api/portraits/men/75.jpg",
    //     "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
    //     "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
    //   },
    //   "nat": "IE"
    // })

    // const transcript2 = new Transcript( {
    // "gender": "female",
    // "name": {
    //     "title": "mrs",
    //     "first": "bradina",
    //     "last": "gibson"
    // },
    // "location": {
    //     "street": "X9278 new road",
    //     "city": "Xkilcoole",
    //     "state": "Xwaterford",
    //     "postcode": "X93027",
    //     "coordinates": {
    //     "latitude": "20.9267",
    //     "longitude": "-7.9310"
    //     },
    //     "timezone": {
    //     "offset": "-3:30",
    //     "description": "Newfoundland"
    //     }
    // },
    // "email": "XXbrad.gibson@example.com",
    // "login": {
    //     "uuid": "155e77ee-ba6d-486f-95ce-0e0c0fb4b919",
    //     "username": "XXsilverswan131",
    //     "password": "XXfirewall",
    //     "salt": "TQA1Gz7x",
    //     "md5": "dc523cb313b63dfe5be2140b0c05b3bc",
    //     "sha1": "7a4aa07d1bedcc6bcf4b7f8856643492c191540d",
    //     "sha256": "74364e96174afa7d17ee52dd2c9c7a4651fe1254f471a78bda0190135dcd3480"
    // },
    // "dob": {
    //     "date": "1993-07-20T09:44:18.674Z",
    //     "age": 26
    // },
    // "registered": {
    //     "date": "2002-05-21T10:59:49.966Z",
    //     "age": 17
    // },
    // "phone": "011-962-7516",
    // "cell": "081-454-0666",
    // "id": {
    //     "name": "PPS",
    //     "value": "0390511T"
    // },
    // "picture": {
    //     "large": "https://randomuser.me/api/portraits/men/75.jpg",
    //     "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
    //     "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
    // },
    // "nat": "IE"
    // })

    const transcript3 = new Transcript( {
        bang: 'sixty nine!!',
    })
    transcript3.save().then( (result) => {
        res.send(result)
    })
    .catch( err => {
        console.log("error occured", err)
    })
})


// router.get('/transcript/:id/sentence', (req, res) => {
    router.get("/yt/test", async (req, res) => {
        let videoId = "M7FIvfx5J10";
        let ytUrl = `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${process.env.YT_KEY}`; 
        let response = await common.makeHttpRequest(ytUrl);
        console.log(response)
        console.log(response.items);
        console.log("==========================");
        console.log("==========================");
        console.log("==========================");
        let englishCcId = ""
        response.data.items.forEach( item => {
            // console.log(item.id);
            // console.log(item.snippet?.videoId);
            // console.log(item.snippet);
            if (item.snippet?.language == "en") {
                console.log(item);
                console.log("ENGLISH", item.id)
                englishCcId = item.id;
                return;
            }
        })
        if (englishCcId) {
            //download cc
            let ytUrl = `https://youtube.googleapis.com/youtube/v3/captions/${englishCcId}?key=${process.env.YT_KEY}`;
            console.log("ytUrl")
            console.log(ytUrl)
            let x = await common.makeHttpRequest(ytUrl);
            console.log("++++++++++++++++++++++++++++++++++++++++++++");
            console.log("++++++++++++++++++++++++++++++++++++++++++++");
            console.log(x)
    
        }
        
        res.statusCode = 200;
        // res.send("GOOD!");
        res.send("GOOD!");
        return;
    })

    router.get("/customGet", async (req, res) => {
        res.render("transcripts/customGet")
    })
    
    
    router.get('/find-transcript', (req, res) => {
        // Transcript.find({"gender": "female"}).then( result =>  {
        // Transcript.findById("62c2e247216d43017babdb67").then( result =>  {
        Transcript.find({"id": 420}).then( result =>  {
            console.log(result)
            res.send(result)
        })
    })
    
    router.get('/null-transcript', (req, res) => {
        Transcript.find({"gender": "femaleZZZ"}).then( result =>  {
            console.log(result)
            if (result) {
                console.log("not null")
            }
            console.log(result.length)
            res.send(result)
        })
    })
    
    
    // var corsOptions = { origin: 'http://localhost:2000' }
    // router.post('/upload3', cors(corsOptions), (req, res) => {
        router.post('/upload3', (req, res) => {
            // res.set('Access-Control-Allow-Origin', '*')
            console.log("got something zzz");
            console.log(req.headers)
            console.log(req.body)
            i =0;
            let body = [];
            req.on("error", err => {
                console.error(err)
            }).on('data', chunk => {
                console.log(`Data chunk available ${i}`);
                i ++
                body.push(chunk)
            })
            // .on('end'), () => {
            //     body = Buffer.concat(body).toString();
            // });
        
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', "*");
            res.send("got it")
        })
    
    
    
    




module.exports = router;


      










    


// router.get('/test/data.json', (req, res) => {
//     let data = {
//           "gender": "male",
//           "location": {
//             "street": "123 new road",
//             "coordinates": {
//               "latitude": "20",
//               "longitude": "-7"
//             }
//         }
//     }
//     res.json(data)
// })

// router.get('/test/data', async (req, res) => {
//     res.write("lets do it");
//     debugger;
//     let x = await makeHttpRequest('localhost:3000/test/data.json');
//     console.log ("x")
//     console.log (x)
//     res.write("")
//     res.end();
// })
















// // db.collection.find()
// db.collection.aggregate([
//     {
//       $project: {
//         highmarks: {
//           $filter: {
//             input: "$captions",
//             as: "thecaps",
//             // cond: { $gte: [ "$$thecaps.fukboy", "69" ] }
//             cond: {
//               $toBool: {
//                 $eq: [
//                   "$$thecaps.fukboy",
//                   "in your head rent free"
//                 ]
//               }
//             }
//           }
//         }
//       }
//     }
//   ])
  
  
//   // db.collection.find()
//   db.collection.aggregate([
//       {
//         $project: {
//           highmarks: {
//             $filter: {
//               input: "$captions",
//               as: "thecaps",
//               // cond: { $gte: [ "$$thecaps.fukboy", "69" ] }
//               cond: {
//                 $in: [
//                   "/head/i",
//                   "$$thecaps"
//                 ]
//               }//$toBool: {
              
//             }
//           }
//         }
//       }
//     ])