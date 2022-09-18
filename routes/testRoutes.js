const express = require('express');
const https = require('https');
const router = express.Router();
const { Transcript } = require('../models/transcript');
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
            title: 1,
            filteredCaptions: {
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

    res.render("")

})


    
// router.get("/test/csv", async (req, res) => {
//     let csvUrl = process.env.CDN_DOMAIN + "/vids/maherTest/maherecsv.csv";
//     // let response = await common.makeHttpRequest(csvUrl, process.env.ASSEMBLYAI_API_KEY , true)
//     let response = await common.makeHttpRequest(csvUrl)
//     let captions = await csv() //csvtojson library
//     .fromString(response.data)
//     .subscribe((csvObj)=>{ 
//         console.log("csvObj:", csvObj)
//         csvObj.Transcript = csvObj.Transcript?.replace("\r", " ");
//         csvObj.fukboy = "in your head rent free";
//     })
//     const captionsMongoose = new Captions({
//         captions,
//         age: "69",
//         title: "real time with my man bill"
//     });
    
//     console.log(captionsMongoose)
//     res.json({captions} )
// }) 


router.get("/test/getMahercsv", async (req, res) => {
    let csvUrl = process.env.CDN_DOMAIN + "/maherTest/maherecsv.csv";
    res.writeHead(302, {
        'Location': csvUrl
    });
    res.end();
})



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// YOUTUBE CAPTIONS .......... TODO
// YOUTUBE CAPTIONS .......... TODO
// YOUTUBE CAPTIONS .......... TODO
// YOUTUBE CAPTIONS .......... TODO
// YOUTUBE CAPTIONS .......... TODO


// router.get("/yt/test", async (req, res) => {
//     let videoId = "M7FIvfx5J10";
//     let ytUrl = `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${process.env.YT_KEY}`; 
//     let response = await common.makeHttpRequest(ytUrl);
//     console.log(response)
//     console.log(response.items);
//     console.log("==========================");
//     console.log("==========================");
//     console.log("==========================");
//     let englishCcId = ""
//     response.data.items.forEach( item => {
//         // console.log(item.id);
//         // console.log(item.snippet?.videoId);
//         // console.log(item.snippet);
//         if (item.snippet?.language == "en") {
//             console.log(item);
//             console.log("ENGLISH", item.id)
//             englishCcId = item.id;
//             return;
//         }
//     })
//     if (englishCcId) {
//         //download cc
//         let ytUrl = `https://youtube.googleapis.com/youtube/v3/captions/${englishCcId}?key=${process.env.YT_KEY}`;
//         console.log("ytUrl")
//         console.log(ytUrl)
//         let x = await common.makeHttpRequest(ytUrl);
//         console.log("++++++++++++++++++++++++++++++++++++++++++++");
//         console.log("++++++++++++++++++++++++++++++++++++++++++++");
//         console.log(x)

//     }
    
//     res.statusCode = 200;
//     res.send("GOOD!");
//     return;
// })




      
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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




router.get("/allTsDbFull", async (req, res) => {

    let allTrans = await Transcript.find({});
    console.log("allTrans")
    console.log(allTrans)
    res.json(allTrans)
})

// router.get("/allTranscriptsAAI", async (req, res) => {
//     let qLimit = 69;
//     let qStatus = "completed";
//     let aiUrl = `https://api.assemblyai.com/v2/transcript?limit=${qLimit}&status=${qStatus}`
//     let resMsg = await common.makeHttpRequest(aiUrl, { headers: { Authorization: authoriziation } });

//     res.statusCode = resMsg.statusCode;
//     resMsg.data['errorMsg'] = resMsg.errorMsg
//     console.log("resMsg.data")
//     console.log("resMsg.data")
//     console.log(resMsg.data)
//     let trimmedRes = resMsg.data.transcripts?.map( ts =>  ts.id )

//     if ( resMsg.errorMsg) { 
//         console.log("something went wrong: " + resMsg.data['errorMsg'] ) 
//         res.json(resMsg)
//     }
//     res.render("transcripts/allTrans", { allItems: trimmedRes })
//     // res.json(resMsg.data)
// })

router.get("/allTranscriptsDb", async (req, res) => {
    const filter = {};
    let allTransIds = await Transcript.find(filter, {id: 1, _id: 0});
    allTransIds = allTransIds.filter( x => x.id != null )
    allTransIds = allTransIds.map( x => x.id)
    console.log("allTransIds", allTransIds)
    res.render("transcripts/allTrans", { allItems: allTransIds })

})

const saveToDb = (CollectionName) => {
    const transcript = new CollectionName(data);
    transcript.save().then( (result) => {
        console.log("save success!.")
    })
    .catch( err => {
        console.log("(My error) Error occured", err)
    })
}

    
router.get('/transcript/:id', async (req, res) => {
    const id = req.params.id;
    const aiUrl = "https://api.assemblyai.com/v2/transcript/" + id;
    let result = await Transcript.findOne({"id": id}).then( result =>  {
        console.log(result?.id)
        console.log(result?._id)
        // Check if in my Database
        return result;
    })
    console.log("result")
    console.log(result)
    // res.statusCode = resMsg.statusCode;
    res.json(result)
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