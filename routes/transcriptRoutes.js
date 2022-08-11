const express = require('express');
// const https = require('node:https');
const https = require('https');
const router = express.Router();
const blogController = require("../controllers/blogController");
const { Transcript } = require('../models/transcript');
const { TranscriptParagraphs } = require('../models/transcript');
const cors = require("cors");
const { appendFile } = require('node:fs');
require("dotenv").config();
const allVids = require("../models/allVids");
const parseString = require('xml2js').parseString;

// console.log(process.env.MY_VAR)
// console.log(process.env.NUMBER)
// console.log(process.env.ASSEMBLYAI_API_KEY)

// https://api.assemblyai.com/v2/transcript/ouo2d25wgl-86ae-413c-93e0-ee50863c5545/sentences




// router.get('/transcript/:id/sentence', (req, res) => {
router.get("/customGet", async (req, res) => {
    res.render("transcripts/customGet")
})

router.get("/allTsDbFull", async (req, res) => {

    let allTrans = await Transcript.find({});
    console.log("allTrans")
    console.log(allTrans)
    res.json(allTrans)
})

router.get("/allTranscriptsDb", async (req, res) => {
    const filter = {};
    let allTransIds = await Transcript.find(filter, {id: 1, _id: 0});
    allTransIds = allTransIds.filter( x => x.id != null )
    allTransIds = allTransIds.map( x => x.id)
    console.log("allTransIds", allTransIds)
    res.render("transcripts/allTrans", { allItems: allTransIds })

})

const getFromAssemblyAi = async (aiUrl) => {
    return new Promise(function (resolve, reject) {

        const options = { headers: { Authorization: process.env.ASSEMBLYAI_API_KEY } }
        let request = https.get(aiUrl, options, (response) => {
            console.log('statusCode:', response.statusCode);
            let data = ''
            response.on('data', function (chunk) {
                console.log("chunk \n", chunk)
                data += chunk;
            });
        
            response.on('end', function () {
                resMsg = {}
                data = JSON.parse(data)
                delete data.words
                console.log("data?.status", data?.status);
                console.log("response.statusCode ", response.statusCode );
    
                if (response.statusCode >= 200 && response.statusCode < 300 ) { // && data?.status?.toLowerCase() == "completed"
                    resMsg = { statusCode: 200 }
                    resMsg['data'] = data;
                    resolve(resMsg);
                } 
                else {
                    let {statusCode, errorMsg} = errorHandler(response)
                    resMsg = { statusCode, errorMsg, }
                    resMsg['data'] = data;
                    reject(resMsg)
                }
            });
        })
        request.on('error', (e) => {
            console.error(e);
            resMsg = { statusCode: 404, errorMsg:  "error making request to AssemblyAI " + e }
            resMsg['data'] = data;
            reject(resMsg)
        });
    })
}

const getItemFromDatabaseById = async (CollectionName, id) => {
    let result = await CollectionName.findOne({"id": id}).then( result =>  {
        console.log(result?.id)
        console.log(result?._id)
        // Check if in my Database
        return result;
    })
    console.log("did it wait???????????????")
    console.log("did it wait???????????????")
    console.log(result)
    return result
}
const saveToDb = (CollectionName) => {
    const transcript = new CollectionName(data);
    transcript.save().then( (result) => {
        console.log("save success!.")
        resMsg = {
            statusCode: 200, 
            data: result
        }
    })
    .catch( err => {
        console.log("(My error) Error occured", err)
        resMsg = {
            statusCode: 500, 
            errorMsg: "Saving data to mongo failed :( " + err, 
        }
    })
}

router.get("/transcript/:id/paragraphs", async (req, res) => {
    const id = req.params.id;
    const aiUrl = "https://api.assemblyai.com/v2/transcript/" + id + "/paragraphs";
    let resMsg = "";
    // let resMsg = await getItemFromDatabaseById(TranscriptParagraphs, aiUrl, id );
    if (resMsg == null || resMsg == "") { // It's not in DB, need to get from AssemblyAI
        console.log("RESULT NOT FOUND IN DB")
        
        console.log("00000 resMsg")
        console.log("00000 resMsg")
        console.log("00000 resMsg")
        console.log("00000 resMsg")
        console.log("00000 resMsg")
        console.log("00000 resMsg")
        resMsg = await getFromAssemblyAi(aiUrl)

        // if (resMsg.statusCode >= 200 && response.statusCode < 300 ) {
        //     saveToDb(TranscriptParagraphs)
        // }
    }
    console.log("XXX resMsg")
    console.log("XXX resMsg")
    console.log("XXX resMsg")
    console.log("XXX resMsg")
    console.log( resMsg)
    res.statusCode = resMsg.statusCode;
    res.json(resMsg.data)
})
    
router.get('/transcript/:id', async (req, res) => {
    const id = req.params.id;
    const aiUrl = "https://api.assemblyai.com/v2/transcript/" + id;
    let result = await getItemFromDatabaseById(Transcript, id );
    console.log(result)
    console.log("result")
    console.log("result")
    console.log("result")
    // res.statusCode = resMsg.statusCode;
    res.json(result)
})

const errorHandler = (response, data) => {
    let statusCode = "";
    let errorMsg = "";
    if (response.statusCode >= 200 && response.statusCode < 300 ) { // && data?.status?.toLowerCase() != "completed"
        console.log("(409) conflict request. Transcription not complete, status code: ", response.statusCode)
        statusCode = 400;
        errorMsg = "Transcription not complete :/";
    }
    else if (response.statusCode >= 400 || response.statusCode < 500) {
        console.log("(400) bad request, status code: ", response.statusCode)
        statusCode = 400;
        errorMsg = "Bad request :( ...Likely wrong ID ";
    }
    else if (response.statusCode > 500) {
        console.log("(500) Assembly AI server error, status code: ", response.statusCode)
        statusCode = 500;
        errorMsg = "Assembly AI broke :(";
    } else {
        console.log("(400) Generic fail, status code: ", response.statusCode)
        statusCode = 400;
        errorMsg = "Generic 400";
    }
    return {statusCode, errorMsg}

}


router.get("/allvids", (req, res) => {
    console.log(allVids)
     // let url = "https://d2h6hz1aakujaj.cloudfront.net/bifrost3d_clothed.png"
     let url = "https://d2h6hz1aakujaj.cloudfront.net"
     let request = https.get(url, {headers: "application/xml"} , (response) => {
         let data = ''
         response.on('data', function (chunk) {
             data += chunk;
         });
     
         response.on('end', function () {
             console.log('statusCode:', response.statusCode);
             if (response.statusCode >= 200 && response.statusCode < 300 ) {
                 console.log("trying to save....")
                 console.log("status", data?.status)
                 parseString(data, function (err, result) {
                     console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx111111111")
                     let allVids = result?.ListBucketResult?.Contents?.filter( item => {
                        return (item.Key[0].slice(-1) != "/")
                     })
                     allVids = allVids.map( item => {
                        return item.Key[0];
                     })
                     console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx")
                     console.log(allVids)
                     res.render("videos/all", {allVids})
                 })
             }
             // res.send(JSON.parse(data))
         }).on('error', (e) => {
             console.error(e);
             res.statusCode = 404
             res.json({error: "Failed to get all vids :("})
         });
     });    
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